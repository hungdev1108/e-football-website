'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuthStore } from '@/store/auth';

// Constants
const TOKEN_REFRESH_THRESHOLD = 23 * 60 * 60 * 1000; // 23 hours in milliseconds
const TOKEN_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const useAuth = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tokenExpiry, setTokenExpiry] = useState(null);
  const refreshTimeoutRef = useRef(null);
  const {
    adminToken,
    adminUser,
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
  } = useAuthStore();

  // Calculate time until token refresh
  const getTimeUntilRefresh = useCallback(() => {
    if (!tokenExpiry) return null;
    const now = Date.now();
    const timeUntilRefresh = tokenExpiry - TOKEN_REFRESH_THRESHOLD - now;
    return Math.max(0, timeUntilRefresh);
  }, [tokenExpiry]);

  // Auto refresh token
  const refreshToken = useCallback(async () => {
    if (isRefreshing || !adminToken) return false;

    setIsRefreshing(true);
    try {
      console.log('🔄 Refreshing admin token...');
      
      const response = await fetch('http://14.225.211.212:5002/api/auth/admin-refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          refreshToken: localStorage.getItem('admin_refresh_token')
        })
      });

      const data = await response.json();

      if (data.success && data.accessToken) {
        // Update tokens
        adminLogin(data.accessToken, data.user || adminUser);
        localStorage.setItem('admin_refresh_token', data.refreshToken);
        
        // Set new expiry time
        const newExpiry = Date.now() + TOKEN_EXPIRY_TIME;
        setTokenExpiry(newExpiry);
        localStorage.setItem('admin_token_expiry', newExpiry.toString());
        
        console.log('✅ Token refreshed successfully');
        scheduleTokenRefresh(newExpiry);
        return true;
      } else {
        console.error('❌ Token refresh failed:', data.message);
        handleLogout();
        return false;
      }
    } catch (error) {
      console.error('❌ Token refresh error:', error);
      handleLogout();
      return false;
    } finally {
      setIsRefreshing(false);
    }
  }, [adminToken, adminUser, adminLogin, isRefreshing, handleLogout, scheduleTokenRefresh]);

  // Schedule automatic token refresh
  const scheduleTokenRefresh = useCallback((expiry) => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    const timeUntilRefresh = expiry - TOKEN_REFRESH_THRESHOLD - Date.now();
    
    if (timeUntilRefresh > 0) {
      console.log(`⏰ Token refresh scheduled in ${Math.round(timeUntilRefresh / 1000 / 60)} minutes`);
      refreshTimeoutRef.current = setTimeout(() => {
        refreshToken();
      }, timeUntilRefresh);
    }
  }, [refreshToken]);

  // Handle logout
  const handleLogout = useCallback(async () => {
    try {
      if (adminToken) {
        await fetch('http://14.225.211.212:5002/api/auth/admin-logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${adminToken}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      adminLogout();
      localStorage.removeItem('admin_refresh_token');
      localStorage.removeItem('admin_token_expiry');
      setTokenExpiry(null);
      
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    }
  }, [adminToken, adminLogout]);

  // Enhanced login with token expiry tracking
  const enhancedLogin = useCallback(async (credentials) => {
    try {
      const response = await fetch('http://14.225.211.212:5002/api/auth/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (data.success && data.accessToken) {
        // Store tokens
        adminLogin(data.accessToken, data.user);
        localStorage.setItem('admin_refresh_token', data.refreshToken);
        
        // Set expiry time
        const expiry = Date.now() + TOKEN_EXPIRY_TIME;
        setTokenExpiry(expiry);
        localStorage.setItem('admin_token_expiry', expiry.toString());
        
        // Schedule refresh
        scheduleTokenRefresh(expiry);
        
        console.log('✅ Login successful, token expires in 24 hours');
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Đăng nhập thất bại' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Lỗi kết nối. Vui lòng thử lại.' };
    }
  }, [adminLogin, scheduleTokenRefresh]);

  // Check token validity on mount
  useEffect(() => {
    const storedExpiry = localStorage.getItem('admin_token_expiry');
    const refreshToken = localStorage.getItem('admin_refresh_token');
    
    if (storedExpiry && refreshToken && adminToken) {
      const expiry = parseInt(storedExpiry);
      const now = Date.now();
      
      if (expiry > now) {
        setTokenExpiry(expiry);
        scheduleTokenRefresh(expiry);
        console.log(`🔐 Token valid for ${Math.round((expiry - now) / 1000 / 60 / 60)} hours`);
      } else {
        console.log('🔄 Token expired, attempting refresh...');
        refreshToken();
      }
    }
  }, [adminToken, scheduleTokenRefresh, handleLogout]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  // Get token status
  const getTokenStatus = useCallback(() => {
    if (!tokenExpiry) return null;
    
    const now = Date.now();
    const timeRemaining = tokenExpiry - now;
    const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    
    return {
      isValid: timeRemaining > 0,
      timeRemaining,
      hoursRemaining,
      minutesRemaining,
      willRefreshSoon: timeRemaining <= TOKEN_REFRESH_THRESHOLD
    };
  }, [tokenExpiry]);

  return {
    // Auth state
    isAuthenticated: isAdminAuthenticated,
    user: adminUser,
    token: adminToken,
    isRefreshing,
    
    // Auth actions
    login: enhancedLogin,
    logout: handleLogout,
    refreshToken,
    
    // Token info
    tokenStatus: getTokenStatus(),
    timeUntilRefresh: getTimeUntilRefresh()
  };
};

export default useAuth;
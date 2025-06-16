'use client';

/**
 * TokenInterceptor - Singleton class for handling API requests with automatic token refresh
 * Features:
 * - Automatic token refresh when needed
 * - Request queuing during token refresh
 * - Token rotation for enhanced security
 * - Convenience methods for common HTTP operations
 */
class TokenInterceptor {
  constructor() {
    if (TokenInterceptor.instance) {
      return TokenInterceptor.instance;
    }

    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api';
    this.isRefreshing = false;
    this.failedQueue = [];
    this.refreshPromise = null;
    
    TokenInterceptor.instance = this;
  }

  // Process failed requests queue
  processQueue(error, token = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    
    this.failedQueue = [];
  }

  // Get current admin token
  getToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('admin_token');
  }

  // Get refresh token
  getRefreshToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('admin_refresh_token');
  }

  // Check if token needs refresh (within 1 hour of expiry)
  shouldRefreshToken() {
    if (typeof window === 'undefined') return false;
    
    const expiry = localStorage.getItem('admin_token_expiry');
    if (!expiry) return false;
    
    const expiryTime = parseInt(expiry);
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    return (expiryTime - now) <= oneHour;
  }

  // Refresh admin token
  async refreshToken() {
    const refreshToken = this.getRefreshToken();
    const currentToken = this.getToken();
    
    if (!refreshToken || !currentToken) {
      throw new Error('No refresh token available');
    }

    try {
      console.log('🔄 TokenInterceptor: Refreshing token...');
      
      const response = await fetch(`${this.baseURL}/auth/admin-refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken}`
        },
        body: JSON.stringify({ refreshToken })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success && data.accessToken) {
        // Update tokens in localStorage
        localStorage.setItem('admin_token', data.accessToken);
        localStorage.setItem('admin_refresh_token', data.refreshToken);
        
        // Update expiry time (24 hours from now)
        const newExpiry = Date.now() + (24 * 60 * 60 * 1000);
        localStorage.setItem('admin_token_expiry', newExpiry.toString());
        
        console.log('✅ TokenInterceptor: Token refreshed successfully');
        return data.accessToken;
      } else {
        throw new Error(data.message || 'Token refresh failed');
      }
    } catch (error) {
      console.error('❌ TokenInterceptor: Token refresh failed:', error);
      
      // Clear all tokens on refresh failure
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_refresh_token');
      localStorage.removeItem('admin_token_expiry');
      
      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }
      
      throw error;
    }
  }

  // Main request method with automatic token refresh
  async request(url, options = {}) {
    const fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`;
    
    // Prepare headers
    const headers = {
      ...options.headers
    };
    
    // Only set Content-Type if not FormData (browser will set it automatically for FormData)
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    // Add auth token if available
    const token = this.getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Check if token needs refresh before making request
    if (token && this.shouldRefreshToken() && !this.isRefreshing) {
      try {
        await this.handleTokenRefresh();
        // Update token in headers after refresh
        const newToken = this.getToken();
        if (newToken) {
          headers.Authorization = `Bearer ${newToken}`;
        }
      } catch (error) {
        console.error('Pre-request token refresh failed:', error);
        // Continue with original token, let the request fail naturally
      }
    }

    const requestOptions = {
      ...options,
      headers
    };

    try {
      console.log(`🌐 API Request: ${options.method || 'GET'} ${fullUrl}`);
      
      const response = await fetch(fullUrl, requestOptions);
      
      // Handle 401 Unauthorized - token expired
      if (response.status === 401 && token) {
        console.log('🔒 401 Unauthorized - attempting token refresh');
        
        try {
          const newToken = await this.handleTokenRefresh();
          
          // Retry original request with new token
          const retryHeaders = {
            ...headers,
            Authorization: `Bearer ${newToken}`
          };
          
          console.log(`🔄 Retrying request with new token: ${options.method || 'GET'} ${fullUrl}`);
          
          const retryResponse = await fetch(fullUrl, {
            ...requestOptions,
            headers: retryHeaders
          });
          
          return this.handleResponse(retryResponse);
        } catch (refreshError) {
          console.error('Token refresh failed during 401 handling:', refreshError);
          throw refreshError;
        }
      }
      
      return this.handleResponse(response);
    } catch (error) {
      console.error(`❌ API Request failed: ${options.method || 'GET'} ${fullUrl}`, error);
      throw error;
    }
  }

  // Handle token refresh with queue management
  async handleTokenRefresh() {
    if (this.isRefreshing) {
      // If already refreshing, wait for the current refresh to complete
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject });
      });
    }

    this.isRefreshing = true;
    
    try {
      const newToken = await this.refreshToken();
      this.processQueue(null, newToken);
      return newToken;
    } catch (error) {
      this.processQueue(error, null);
      throw error;
    } finally {
      this.isRefreshing = false;
    }
  }

  // Handle response parsing
  async handleResponse(response) {
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      if (!response.ok) {
        const error = new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
        error.status = response.status;
        error.data = data;
        throw error;
      }
      
      return data;
    } else {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    }
  }

  // Convenience methods
  async get(url, options = {}) {
    return this.request(url, {
      ...options,
      method: 'GET'
    });
  }

  async post(url, data = null, options = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async put(url, data = null, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async patch(url, data = null, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined
    });
  }

  async delete(url, options = {}) {
    return this.request(url, {
      ...options,
      method: 'DELETE'
    });
  }

  // Upload file with automatic token refresh
  async upload(url, formData, options = {}) {
    const token = this.getToken();
    
    // Check if token needs refresh
    if (token && this.shouldRefreshToken()) {
      await this.handleTokenRefresh();
    }
    
    const headers = {
      ...options.headers
    };
    
    // Don't set Content-Type for FormData, let browser set it
    delete headers['Content-Type'];
    
    const newToken = this.getToken();
    if (newToken) {
      headers.Authorization = `Bearer ${newToken}`;
    }

    return this.request(url, {
      ...options,
      method: 'POST',
      headers,
      body: formData
    });
  }

  // Get current authentication status
  isAuthenticated() {
    const token = this.getToken();
    const expiry = localStorage.getItem('admin_token_expiry');
    
    if (!token || !expiry) return false;
    
    const expiryTime = parseInt(expiry);
    return Date.now() < expiryTime;
  }

  // Clear all tokens and logout
  logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_refresh_token');
    localStorage.removeItem('admin_token_expiry');
    
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
  }
}

// Create and export singleton instance
const tokenInterceptor = new TokenInterceptor();
export default tokenInterceptor;

// Named export for convenience
export { tokenInterceptor };
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '@/types';

interface AdminUser {
  username: string;
  role: 'admin';
  isAdmin: boolean;
}

interface AuthStore extends AuthState {
  // User auth (existing)
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  
  // Admin auth (enhanced)
  adminToken: string | null;
  adminRefreshToken: string | null;
  adminTokenExpiry: number | null;
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  adminLogin: (token: string, user: AdminUser, refreshToken?: string) => void;
  adminLogout: () => void;
  updateAdminTokens: (accessToken: string, refreshToken: string) => void;
  checkAdminAuth: () => Promise<boolean>;
  isTokenExpired: () => boolean;
  getTokenTimeRemaining: () => number;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Existing user auth
      user: null,
      isLoading: false,
      isAuthenticated: false,

      login: (user: User) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...userData },
          });
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // Enhanced admin auth
      adminToken: null,
      adminRefreshToken: null,
      adminTokenExpiry: null,
      adminUser: null,
      isAdminAuthenticated: false,
      
      adminLogin: (token: string, user: AdminUser, refreshToken?: string) => {
        const expiry = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
        
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_token_expiry', expiry.toString());
        
        if (refreshToken) {
          localStorage.setItem('admin_refresh_token', refreshToken);
        }
        
        set({ 
          adminToken: token,
          adminRefreshToken: refreshToken || null,
          adminTokenExpiry: expiry,
          adminUser: user,
          isAdminAuthenticated: true 
        });
      },
      
      updateAdminTokens: (accessToken: string, refreshToken: string) => {
        const expiry = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
        
        localStorage.setItem('admin_token', accessToken);
        localStorage.setItem('admin_refresh_token', refreshToken);
        localStorage.setItem('admin_token_expiry', expiry.toString());
        
        set({ 
          adminToken: accessToken,
          adminRefreshToken: refreshToken,
          adminTokenExpiry: expiry
        });
      },
      
      isTokenExpired: () => {
        const { adminTokenExpiry } = get();
        if (!adminTokenExpiry) return true;
        return Date.now() >= adminTokenExpiry;
      },
      
      getTokenTimeRemaining: () => {
        const { adminTokenExpiry } = get();
        if (!adminTokenExpiry) return 0;
        return Math.max(0, adminTokenExpiry - Date.now());
      },
      
      adminLogout: () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_refresh_token');
        localStorage.removeItem('admin_token_expiry');
        set({ 
          adminToken: null,
          adminRefreshToken: null,
          adminTokenExpiry: null,
          adminUser: null,
          isAdminAuthenticated: false 
        });
      },
      
      checkAdminAuth: async () => {
        const token = localStorage.getItem('admin_token');
        const expiry = localStorage.getItem('admin_token_expiry');
        const refreshToken = localStorage.getItem('admin_refresh_token');
        
        if (!token) {
          get().adminLogout();
          return false;
        }
        
        // Check if token is expired
        if (expiry && Date.now() >= parseInt(expiry)) {
          console.log('🔄 Token expired, attempting refresh...');
          
          if (refreshToken) {
            try {
              const response = await fetch('http://localhost:5002/api/auth/admin-refresh-token', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ refreshToken })
              });
              
              const data = await response.json();
              
              if (data.success && data.accessToken) {
                get().updateAdminTokens(data.accessToken, data.refreshToken);
                console.log('✅ Token refreshed successfully');
                return true;
              }
            } catch (error) {
              console.error('Token refresh failed:', error);
            }
          }
          
          get().adminLogout();
          return false;
        }
        
        try {
          const response = await fetch('http://localhost:5002/api/auth/admin-verify', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            set({ 
              adminToken: token,
              adminRefreshToken: refreshToken,
              adminTokenExpiry: expiry ? parseInt(expiry) : null,
              adminUser: data.user,
              isAdminAuthenticated: true 
            });
            return true;
          } else {
            get().adminLogout();
            return false;
          }
        } catch (error) {
          console.error('Admin auth check failed:', error);
          get().adminLogout();
          return false;
        }
      }
    }),
    { 
      name: 'auth-storage',
      partialize: (state) => ({
        // User auth
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        // Admin auth (enhanced)
        adminToken: state.adminToken,
        adminRefreshToken: state.adminRefreshToken,
        adminTokenExpiry: state.adminTokenExpiry,
        adminUser: state.adminUser,
        isAdminAuthenticated: state.isAdminAuthenticated,
      }),
    }
  )
);
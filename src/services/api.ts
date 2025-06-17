import axios, { AxiosResponse } from 'axios';
import { ApiResponse, PaginatedResponse } from '@/types';

// Create axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://14.225.211.212:5002/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage or auth store
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
      }
    }
    
    if (error.response?.status === 403) {
      // Handle forbidden access
      console.error('Access forbidden');
    }
    
    if (error.response?.status >= 500) {
      // Handle server errors
      console.error('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);

// Account API Services
export const accountService = {
  // Get all accounts with filters
  getAccounts: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    platform?: string;
    sort?: string;
    search?: string;
  }) => {
    const response = await api.get('/accounts', { params });
    return response.data;
  },

  // Get featured accounts
  getFeaturedAccounts: async (limit = 8) => {
    const response = await api.get('/accounts/featured', { params: { limit } });
    return response.data;
  },

  // Get account by ID
  getAccountById: async (id: string) => {
    const response = await api.get(`/accounts/${id}`);
    return response.data;
  },

  // Get categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get accounts by price range
  getAccountsByPriceRange: async (minPrice: number, maxPrice: number, limit = 12) => {
    const response = await api.get('/accounts/price-range', {
      params: { minPrice, maxPrice, limit }
    });
    return response.data;
  },
};

// News API Services
export const newsService = {
  // Get all news with pagination
  getNews: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    const response = await api.get('/news', { params });
    return response.data;
  },

  // Get featured news
  getFeaturedNews: async (limit = 5) => {
    const response = await api.get('/news/featured', { params: { limit } });
    return response.data;
  },

  // Get latest news
  getLatestNews: async (limit = 5) => {
    const response = await api.get('/news/latest', { params: { limit } });
    return response.data;
  },

  // Get news by ID
  getNewsById: async (id: string) => {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },
};

// System API Services
export const systemService = {
  // Get logo
  getLogo: async () => {
    const response = await api.get('/system/logo');
    return response.data;
  },

  // Get banners
  getBanners: async () => {
    const response = await api.get('/system/banners');
    return response.data;
  },

  // Get system settings (public)
  getSettings: async () => {
    const response = await api.get('/system/settings/public');
    return response.data;
  },
};

// Generic API methods
export const apiService = {
  // GET request
  get: async <T = unknown>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> => {
    const response = await api.get(url, { params });
    return response.data;
  },

  // POST request
  post: async <T = unknown>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> => {
    const response = await api.post(url, data);
    return response.data;
  },

  // PUT request
  put: async <T = unknown>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> => {
    const response = await api.put(url, data);
    return response.data;
  },

  // PATCH request
  patch: async <T = unknown>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> => {
    const response = await api.patch(url, data);
    return response.data;
  },

  // DELETE request
  delete: async <T = unknown>(url: string): Promise<ApiResponse<T>> => {
    const response = await api.delete(url);
    return response.data;
  },

  // GET request with pagination
  getPaginated: async <T = unknown>(
    url: string, 
    params?: Record<string, unknown>
  ): Promise<PaginatedResponse<T>> => {
    const response = await api.get(url, { params });
    return response.data;
  },
};

// Upload files
export const uploadFile = async (file: File, onProgress?: (progress: number) => void) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total && onProgress) {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(progress);
      }
    },
  });

  return response.data;
};

export default api;
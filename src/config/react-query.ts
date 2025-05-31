import { QueryClient, DefaultOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// Default options for React Query
const queryConfig: DefaultOptions = {
  queries: {
    // Time in milliseconds after data is considered stale
    staleTime: 5 * 60 * 1000, // 5 minutes
    // Time in milliseconds that unused/inactive cache data remains in memory
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    // Retry failed requests
    retry: (failureCount, error: Error | AxiosError) => {
      // Don't retry for 4xx errors except 429 (rate limit)
      if ('response' in error && error.response?.status && error.response.status >= 400 && error.response.status < 500 && error.response.status !== 429) {
        return false;
      }
      return failureCount < 3;
    },
    // Retry delay
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    // Refetch on window focus
    refetchOnWindowFocus: false,
    // Refetch on reconnect
    refetchOnReconnect: true,
    // Refetch on mount if data is stale
    refetchOnMount: true,
  },
  mutations: {
    // Retry failed mutations
    retry: (failureCount, error: Error | AxiosError) => {
      // Don't retry for 4xx errors
      if ('response' in error && error.response?.status && error.response.status >= 400 && error.response.status < 500) {
        return false;
      }
      return failureCount < 2;
    },
  },
};

// Create QueryClient instance
export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

// Query keys factory for consistent key management
export const queryKeys = {
  // Auth
  auth: {
    user: () => ['auth', 'user'] as const,
    profile: () => ['auth', 'profile'] as const,
  },
  
  // Game Accounts
  accounts: {
    all: () => ['accounts'] as const,
    lists: () => [...queryKeys.accounts.all(), 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.accounts.lists(), filters] as const,
    details: () => [...queryKeys.accounts.all(), 'detail'] as const,
    detail: (id: string) => [...queryKeys.accounts.details(), id] as const,
    search: (query: string, filters?: Record<string, unknown>) => ['accounts', 'search', query, filters] as const,
    featured: () => ['accounts', 'featured'] as const,
    trending: () => ['accounts', 'trending'] as const,
  },
  
  // Categories
  categories: {
    all: () => ['categories'] as const,
    list: () => [...queryKeys.categories.all(), 'list'] as const,
    detail: (id: string) => [...queryKeys.categories.all(), 'detail', id] as const,
  },
  
  // Orders
  orders: {
    all: () => ['orders'] as const,
    lists: () => [...queryKeys.orders.all(), 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.orders.lists(), filters] as const,
    details: () => [...queryKeys.orders.all(), 'detail'] as const,
    detail: (id: string) => [...queryKeys.orders.details(), id] as const,
    userOrders: (userId: string) => ['orders', 'user', userId] as const,
  },
  
  // Cart
  cart: {
    all: () => ['cart'] as const,
    items: () => [...queryKeys.cart.all(), 'items'] as const,
  },
  
  // Notifications
  notifications: {
    all: () => ['notifications'] as const,
    list: () => [...queryKeys.notifications.all(), 'list'] as const,
    unread: () => [...queryKeys.notifications.all(), 'unread'] as const,
  },
  
  // Admin
  admin: {
    all: () => ['admin'] as const,
    stats: () => [...queryKeys.admin.all(), 'stats'] as const,
    users: () => [...queryKeys.admin.all(), 'users'] as const,
    reports: () => [...queryKeys.admin.all(), 'reports'] as const,
  },
} as const; 
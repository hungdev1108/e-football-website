import { useQuery } from '@tanstack/react-query';
import { accountService } from '@/services/api';

// Hook to get all accounts with filters
export const useAccounts = (params?: {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  platform?: string;
  sort?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['accounts', params],
    queryFn: async () => {
      console.log('🔍 Calling API with params:', params);
      try {
        const result = await accountService.getAccounts(params);
        console.log('✅ API Response:', result);
        return result;
      } catch (error) {
        console.error('❌ API Error:', error);
        throw error;
      }
    },
    staleTime: 3 * 60 * 1000, // 3 minutes (reduced for real-time updates)
    enabled: true, // Always enabled
    retry: 1, // Retry once on failure
    onError: (error) => {
      console.error('🚨 useAccounts Error:', error);
    },
  });
};

// Hook to get featured accounts
export const useFeaturedAccounts = (limit = 8) => {
  return useQuery({
    queryKey: ['accounts', 'featured', limit],
    queryFn: () => accountService.getFeaturedAccounts(limit),
    staleTime: 15 * 60 * 1000, // 15 minutes (increased for stable featured content)
    enabled: true,
  });
};

// Hook to get account by ID
export const useAccount = (id: string) => {
  return useQuery({
    queryKey: ['accounts', 'detail', id],
    queryFn: () => accountService.getAccountById(id),
    enabled: !!id && id.length > 0, // Only fetch if ID is valid
    staleTime: 5 * 60 * 1000,
  });
};

// Hook to get categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('🔍 Calling Categories API...');
      try {
        const result = await accountService.getCategories();
        console.log('✅ Categories API Response:', result);
        return result;
      } catch (error) {
        console.error('❌ Categories API Error:', error);
        throw error;
      }
    },
    staleTime: 60 * 60 * 1000, // 1 hour - categories don't change often
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    enabled: true,
    retry: 1, // Retry once on failure
    onError: (error) => {
      console.error('🚨 useCategories Error:', error);
    },
  });
};

// Hook to get accounts by price range
export const useAccountsByPriceRange = (minPrice: number, maxPrice: number, limit = 12) => {
  return useQuery({
    queryKey: ['accounts', 'price-range', minPrice, maxPrice, limit],
    queryFn: () => accountService.getAccountsByPriceRange(minPrice, maxPrice, limit),
    enabled: minPrice >= 0 && maxPrice > minPrice && maxPrice <= 1000000000, // Reasonable limits
    staleTime: 5 * 60 * 1000,
  });
};
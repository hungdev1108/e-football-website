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
    queryFn: () => accountService.getAccounts(params),
    staleTime: 3 * 60 * 1000, // 3 minutes (reduced for real-time updates)
    enabled: true, // Always enabled
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
    queryFn: () => accountService.getCategories(),
    staleTime: 60 * 60 * 1000, // 1 hour - categories don't change often
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    enabled: true,
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
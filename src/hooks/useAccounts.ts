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
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get featured accounts
export const useFeaturedAccounts = (limit = 8) => {
  return useQuery({
    queryKey: ['accounts', 'featured', limit],
    queryFn: () => accountService.getFeaturedAccounts(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to get account by ID
export const useAccount = (id: string) => {
  return useQuery({
    queryKey: ['accounts', 'detail', id],
    queryFn: () => accountService.getAccountById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook to get categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => accountService.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes - categories don't change often
  });
};

// Hook to get accounts by price range
export const useAccountsByPriceRange = (minPrice: number, maxPrice: number, limit = 12) => {
  return useQuery({
    queryKey: ['accounts', 'price-range', minPrice, maxPrice, limit],
    queryFn: () => accountService.getAccountsByPriceRange(minPrice, maxPrice, limit),
    enabled: minPrice >= 0 && maxPrice > minPrice,
    staleTime: 5 * 60 * 1000,
  });
}; 
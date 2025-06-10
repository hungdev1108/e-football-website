import { useQuery } from '@tanstack/react-query';
import { systemService } from '@/services/api';

// Hook to get logo
export const useLogo = () => {
  return useQuery({
    queryKey: ['system', 'logo'],
    queryFn: () => systemService.getLogo(),
    staleTime: 60 * 60 * 1000, // 1 hour - logo doesn't change often
  });
};

// Hook to get banners
export const useBanners = () => {
  return useQuery({
    queryKey: ['system', 'banners'],
    queryFn: () => systemService.getBanners(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}; 
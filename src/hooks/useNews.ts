import { useQuery } from '@tanstack/react-query';
import { newsService } from '@/services/api';

// Hook to get all news with pagination
export const useNews = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['news', params],
    queryFn: () => newsService.getNews(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get featured news
export const useFeaturedNews = (limit = 5) => {
  return useQuery({
    queryKey: ['news', 'featured', limit],
    queryFn: () => newsService.getFeaturedNews(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to get latest news
export const useLatestNews = (limit = 5) => {
  return useQuery({
    queryKey: ['news', 'latest', limit],
    queryFn: () => newsService.getLatestNews(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to get news by ID
export const useNewsById = (id: string) => {
  return useQuery({
    queryKey: ['news', 'detail', id],
    queryFn: () => newsService.getNewsById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}; 
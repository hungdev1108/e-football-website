import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import tokenInterceptor from '@/services/tokenInterceptor';

// Define types
interface AdminNewsFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  featured?: string;
  [key: string]: string | number | undefined;
}

interface NewsData {
  title: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  status: 'published' | 'draft' | 'archived';
  featured?: boolean;
  featuredImage?: {
    url: string;
    alt: string;
  };
  // ✅ LOẠI BỎ: author?: string;
}

// Get all news for admin
export const useAdminNews = (filters: AdminNewsFilters) => {
  return useQuery({
    queryKey: ['adminNews', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== '' && value !== 'all') {
          params.append(key, String(value));
        }
      });

      const response = await tokenInterceptor.get(`/news/admin/all?${params}`);
      return response;
    },
  });
};

// Create news
export const useCreateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newsData: any) => {
      console.log('🔍 Frontend sending data:', newsData);
      const response = await tokenInterceptor.post('/news', newsData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminNews'] });
    },
  });
};

// Update news
export const useUpdateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<NewsData> }) => {
      const response = await tokenInterceptor.put(`/news/${id}`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminNews'] });
    },
  });
};

// Delete news
export const useDeleteNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await tokenInterceptor.delete(`/news/${id}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminNews'] });
    },
  });
};

// Toggle featured status
export const useToggleFeatured = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, featured }: { id: string; featured: boolean }) => {
      const response = await tokenInterceptor.patch(`/news/${id}/featured`, { featured });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminNews'] });
    },
  });
};

// Get single news for editing
export const useAdminNewsById = (id: string) => {
  return useQuery({
    queryKey: ['adminNews', id],
    queryFn: async () => {
      const response = await tokenInterceptor.get(`/news/${id}`);
      return response;
    },
    enabled: !!id,
  });
};
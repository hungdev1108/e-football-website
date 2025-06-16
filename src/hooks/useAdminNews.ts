import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import tokenInterceptor from '@/services/tokenInterceptor';

// Get all news for admin
export const useAdminNews = (filters: any) => {
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
      const response = await tokenInterceptor.post('/news', newsData);
      return response;
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
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
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
      const response = await fetch(`${API_BASE}/news/${id}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      return response.json();
    },
    enabled: !!id,
  });
};
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { toast } from 'react-hot-toast';
import { AdminNewsFormData, AdminErrorResponse } from '@/types/admin';

interface AdminQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

// Hook để lấy danh sách tin tức (cho admin)
export const useAdminNews = (params?: AdminQueryParams) => {
  return useQuery({
    queryKey: ['admin', 'news', params],
    queryFn: () => apiService.get('/admin/news', params as Record<string, unknown>),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook để tạo tin tức mới
export const useCreateNews = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newsData: AdminNewsFormData) => apiService.post('/admin/news', newsData as unknown as Record<string, unknown>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'news'] });
      queryClient.invalidateQueries({ queryKey: ['news'] });
      toast.success('Tạo tin tức thành công!');
    },
    onError: (error: AdminErrorResponse) => {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra khi tạo tin tức');
    },
  });
};

// Hook để cập nhật tin tức
export const useUpdateNews = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AdminNewsFormData> }) => 
      apiService.put(`/admin/news/${id}`, data as unknown as Record<string, unknown>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'news'] });
      queryClient.invalidateQueries({ queryKey: ['news'] });
      toast.success('Cập nhật tin tức thành công!');
    },
    onError: (error: AdminErrorResponse) => {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra khi cập nhật tin tức');
    },
  });
};

// Hook để xóa tin tức
export const useDeleteNews = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiService.delete(`/admin/news/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'news'] });
      queryClient.invalidateQueries({ queryKey: ['news'] });
      toast.success('Xóa tin tức thành công!');
    },
    onError: (error: AdminErrorResponse) => {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra khi xóa tin tức');
    },
  });
}; 
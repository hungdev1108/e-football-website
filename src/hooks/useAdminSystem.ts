import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { toast } from 'react-hot-toast';

// Hook để lấy cài đặt hệ thống
export const useAdminSystemSettings = () => {
  return useQuery({
    queryKey: ['admin', 'system', 'settings'],
    queryFn: () => apiService.get('/admin/system/settings'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook để lấy danh sách banner
export const useAdminBanners = () => {
  return useQuery({
    queryKey: ['admin', 'system', 'banners'],
    queryFn: () => apiService.get('/admin/system/banners'),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook để cập nhật logo
export const useUpdateLogo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (logoData: FormData) => apiService.post('/admin/system/logo', logoData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'system'] });
      queryClient.invalidateQueries({ queryKey: ['system'] });
      toast.success('Cập nhật logo thành công!');
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response: { data: { message: string } } }).response?.data?.message 
        : 'Có lỗi xảy ra khi cập nhật logo';
      toast.error(errorMessage);
    },
  });
};

// Hook để tạo/cập nhật banner
export const useUpdateBanner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id?: string; data: FormData }) => 
      id ? apiService.put(`/admin/system/banners/${id}`, data) : apiService.post('/admin/system/banners', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'system'] });
      queryClient.invalidateQueries({ queryKey: ['system'] });
      toast.success('Cập nhật banner thành công!');
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response: { data: { message: string } } }).response?.data?.message 
        : 'Có lỗi xảy ra khi cập nhật banner';
      toast.error(errorMessage);
    },
  });
};

// Hook để xóa banner
export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiService.delete(`/admin/system/banners/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'system'] });
      queryClient.invalidateQueries({ queryKey: ['system'] });
      toast.success('Xóa banner thành công!');
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response: { data: { message: string } } }).response?.data?.message 
        : 'Có lỗi xảy ra khi xóa banner';
      toast.error(errorMessage);
    },
  });
}; 
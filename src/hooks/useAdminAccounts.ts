import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { toast } from 'react-hot-toast';
import { AdminAccountFormData, AdminQueryParams, AdminErrorResponse } from '@/types/admin';

// Hook để lấy danh sách tài khoản game (cho admin)
export const useAdminAccounts = (params?: AdminQueryParams) => {
  return useQuery({
    queryKey: ['admin', 'accounts', params],
    queryFn: () => apiService.get('/admin/accounts', params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook để tạo tài khoản game mới
export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (accountData: AdminAccountFormData) => apiService.post('/admin/accounts', accountData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'accounts'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      toast.success('Tạo tài khoản thành công!');
    },
    onError: (error: AdminErrorResponse) => {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra khi tạo tài khoản');
    },
  });
};

// Hook để cập nhật tài khoản game
export const useUpdateAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AdminAccountFormData> }) => 
      apiService.put(`/admin/accounts/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'accounts'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      toast.success('Cập nhật tài khoản thành công!');
    },
    onError: (error: AdminErrorResponse) => {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra khi cập nhật tài khoản');
    },
  });
};

// Hook để xóa tài khoản game
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiService.delete(`/admin/accounts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'accounts'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      toast.success('Xóa tài khoản thành công!');
    },
    onError: (error: AdminErrorResponse) => {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra khi xóa tài khoản');
    },
  });
};

// Hook để upload ảnh
export const useUploadImage = () => {
  return useMutation({
    mutationFn: (formData: FormData) => apiService.post('/admin/upload', formData),
    onError: (error: AdminErrorResponse) => {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra khi upload ảnh');
    },
  });
}; 
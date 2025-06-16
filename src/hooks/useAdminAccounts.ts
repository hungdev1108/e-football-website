import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import tokenInterceptor from '@/services/tokenInterceptor';

// Get all accounts for admin
export const useAdminAccounts = (filters: any) => {
  return useQuery({
    queryKey: ['adminAccounts', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== '' && value !== 'all') {
          params.append(key, String(value));
        }
      });

      const response = await tokenInterceptor.get(`/accounts/admin/all?${params}`);
      return response;
    },
  });
};

// Create account
export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (accountData: any) => {
      console.log('Creating account with data:', JSON.stringify(accountData, null, 2));
      
      const response = await tokenInterceptor.post('/accounts/admin/create', accountData);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminAccounts'] });
    },
  });
};

// Update account
export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await tokenInterceptor.put(`/accounts/admin/${id}`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminAccounts'] });
    },
  });
};

// Delete account
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await tokenInterceptor.delete(`/accounts/admin/${id}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminAccounts'] });
    },
  });
};

// Upload image
export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await tokenInterceptor.request('/accounts/admin/upload-image', {
        method: 'POST',
        body: formData,
        headers: {} // Don't set Content-Type for FormData
      });
      return response;
    },
  });
};

// Get categories
export const useAdminCategories = () => {
  return useQuery({
    queryKey: ['adminCategories'],
    queryFn: async () => {
      const data = await tokenInterceptor.get('/accounts/categories');
      // Ensure we return an array
      return Array.isArray(data) ? data : (data?.data || data?.categories || []);
    },
  });
};
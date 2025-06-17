import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import tokenInterceptor from '@/services/tokenInterceptor';

// Define types
interface AdminAccountFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
  featured?: string;
  platform?: string;
  [key: string]: string | number | undefined;
}

interface AccountData {
  title: string;
  description: string;
  price: number;
  category: string;
  accountCode: string;
  collectiveStrength: number;
  status: 'available' | 'sold' | 'reserved';
  featured: boolean;
  accountDetails: {
    platform: string;
    coins: number;
    gp: number;
    players: string[];
  };
  images: Array<{ url: string; alt: string }>;
}

// Get all accounts for admin
export const useAdminAccounts = (filters: AdminAccountFilters) => {
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
    mutationFn: async (accountData: AccountData) => {
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
    mutationFn: async ({ id, data }: { id: string; data: Partial<AccountData> }) => {
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
      interface CategoriesResponse {
        data?: unknown[];
        categories?: unknown[];
      }
      return Array.isArray(data) ? data : ((data as CategoriesResponse)?.data || (data as CategoriesResponse)?.categories || []);
    },
  });
};
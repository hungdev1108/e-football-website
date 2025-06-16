import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import tokenInterceptor from '@/services/tokenInterceptor';

// Types
interface SystemInfo {
  server: {
    nodeVersion: string;
    platform: string;
    arch: string;
    uptime: number;
    memory: {
      rss: number;
      heapTotal: number;
      heapUsed: number;
      external: number;
    };
  };
  database: {
    totalUsers: number;
    totalNews: number;
    connectionStatus: string;
  };
  storage: {
    uploads: number;
    images: number;
    total: number;
  };
  lastUpdated: string;
}

interface SystemSettings {
  _id: string;
  // Site Information
  siteName: string;
  siteDescription: string;
  
  // Logo
  logo: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  
  // Banner Images
  bannerImages: Array<{
    url: string;
    alt: string;
    title: string;
    description: string;
    link: string;
    order: number;
  }>;
  
  // Contact Information
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    workingHours: string;
  };
  
  // Social Media
  socialMedia: {
    facebook: string;
    telegram: string;
    zalo: string;
    youtube: string;
  };
  
  // Banking Information
  bankingInfo: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    qrCodeImage: {
      url: string;
      alt: string;
    };
  };
  
  // SEO Settings
  seoSettings: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    ogImage: string;
  };
  
  // Features
  features: {
    enableRegistration: boolean;
    enableCart: boolean;
    enableReviews: boolean;
    maintenanceMode: boolean;
  };
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  updatedBy?: string;
}

interface Banner {
  _id: string;
  title: string;
  image: string;
  link?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}



// API Functions using tokenInterceptor
const adminApi = {
  // System Info
  getSystemInfo: async (): Promise<{ success: boolean; data: SystemInfo }> => {
    const response = await tokenInterceptor.get('/system/info');
    return response;
  },

  // Settings - Admin endpoints
  getSystemSettings: async (): Promise<{ success: boolean; data: SystemSettings }> => {
    const response = await tokenInterceptor.get('/system/settings');
    return response;
  },

  updateSystemSettings: async (settings: Partial<SystemSettings>): Promise<{ success: boolean; data: SystemSettings }> => {
    const response = await tokenInterceptor.put('/system/settings', settings);
    return response;
  },

  // Public settings endpoints
  getPublicSettings: async (): Promise<{ success: boolean; data: any }> => {
    const response = await tokenInterceptor.get('/system/settings/public');
    return response;
  },

  getPublicLogo: async (): Promise<{ success: boolean; data: any }> => {
    const response = await tokenInterceptor.get('/system/logo');
    return response;
  },

  getPublicBanners: async (): Promise<{ success: boolean; data: Banner[] }> => {
    const response = await tokenInterceptor.get('/system/banners');
    return response;
  },

  // Logo upload
  updateLogo: async (logoFile: File): Promise<{ success: boolean; data: any }> => {
    const formData = new FormData();
    formData.append('logo', logoFile);
    
    const response = await tokenInterceptor.put('/system/logo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  },

  // QR Code upload
  updateQRCode: async (qrFile: File): Promise<{ success: boolean; data: any }> => {
    const formData = new FormData();
    formData.append('qrCode', qrFile);
    
    const response = await tokenInterceptor.put('/system/qr-code', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  },

  // Banners - Admin endpoints
  getBanners: async (): Promise<{ success: boolean; data: Banner[] }> => {
    const response = await tokenInterceptor.get('/system/banners/admin');
    return response;
  },

  createBanner: async (bannerData: Partial<Banner>): Promise<{ success: boolean; data: Banner }> => {
    const response = await tokenInterceptor.post('/system/banners', bannerData);
    return response;
  },

  updateBanner: async ({ id, data }: { id: string; data: Partial<Banner> }): Promise<{ success: boolean; data: Banner }> => {
    const response = await tokenInterceptor.put(`/system/banners/${id}`, data);
    return response;
  },

  deleteBanner: async (id: string): Promise<{ success: boolean }> => {
    const response = await tokenInterceptor.delete(`/system/banners/${id}`);
    return response;
  },

  toggleBannerStatus: async (id: string): Promise<{ success: boolean; data: { isActive: boolean } }> => {
    const response = await tokenInterceptor.patch(`/system/banners/${id}/toggle`);
    return response;
  },

  // Banner upload
  uploadBanners: async (bannerFiles: File[]): Promise<{ success: boolean; data: any }> => {
    const formData = new FormData();
    bannerFiles.forEach(file => {
      formData.append('banners', file);
    });
    
    const response = await tokenInterceptor.post('/system/banners/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  },


};

// ======================== HOOKS ========================

// System Info
export const useAdminSystemInfo = () => {
  return useQuery({
    queryKey: ['admin', 'system', 'info'],
    queryFn: adminApi.getSystemInfo,
    refetchInterval: 30000, // Refresh every 30 seconds
  });
};

// System Settings
export const useAdminSystemSettings = () => {
  return useQuery({
    queryKey: ['admin', 'system', 'settings'],
    queryFn: adminApi.getSystemSettings,
  });
};

export const useUpdateSystemSettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.updateSystemSettings,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['admin', 'system', 'settings'] });
        toast.success('Cập nhật cài đặt thành công');
      } else {
        toast.error('Cập nhật cài đặt thất bại');
      }
    },
    onError: () => {
      toast.error('Lỗi khi cập nhật cài đặt');
    },
  });
};

// Logo
export const useUpdateLogo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.updateLogo,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['admin', 'system'] });
        toast.success('Cập nhật logo thành công');
      } else {
        toast.error('Cập nhật logo thất bại');
      }
    },
    onError: () => {
      toast.error('Lỗi khi cập nhật logo');
    },
  });
};

// Banners
export const useAdminBanners = () => {
  return useQuery({
    queryKey: ['admin', 'banners'],
    queryFn: adminApi.getBanners,
  });
};

export const useCreateBanner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.createBanner,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['admin', 'banners'] });
        toast.success('Tạo banner thành công');
      } else {
        toast.error('Tạo banner thất bại');
      }
    },
    onError: () => {
      toast.error('Lỗi khi tạo banner');
    },
  });
};

export const useUpdateBanner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.updateBanner,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['admin', 'banners'] });
        toast.success('Cập nhật banner thành công');
      } else {
        toast.error('Cập nhật banner thất bại');
      }
    },
    onError: () => {
      toast.error('Lỗi khi cập nhật banner');
    },
  });
};

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.deleteBanner,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['admin', 'banners'] });
        toast.success('Xóa banner thành công');
      } else {
        toast.error('Xóa banner thất bại');
      }
    },
    onError: () => {
      toast.error('Lỗi khi xóa banner');
    },
  });
};

export const useToggleBannerStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.toggleBannerStatus,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['admin', 'banners'] });
        toast.success(`Banner đã ${data.data.isActive ? 'kích hoạt' : 'tắt'}`);
      } else {
        toast.error('Thay đổi trạng thái banner thất bại');
      }
    },
    onError: () => {
      toast.error('Lỗi khi thay đổi trạng thái banner');
    },
  });
};

// QR Code Upload
export const useUpdateQRCode = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.updateQRCode,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['admin', 'system'] });
        toast.success('Cập nhật QR code thành công');
      } else {
        toast.error('Cập nhật QR code thất bại');
      }
    },
    onError: () => {
      toast.error('Lỗi khi cập nhật QR code');
    },
  });
};

// Banner Upload
export const useUploadBanners = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.uploadBanners,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['admin', 'banners'] });
        toast.success('Upload banner thành công');
      } else {
        toast.error('Upload banner thất bại');
      }
    },
    onError: () => {
      toast.error('Lỗi khi upload banner');
    },
  });
};

// Public hooks for frontend
export const usePublicSettings = () => {
  return useQuery({
    queryKey: ['public', 'settings'],
    queryFn: adminApi.getPublicSettings,
  });
};

export const usePublicLogo = () => {
  return useQuery({
    queryKey: ['public', 'logo'],
    queryFn: adminApi.getPublicLogo,
  });
};

export const usePublicBanners = () => {
  return useQuery({
    queryKey: ['public', 'banners'],
    queryFn: adminApi.getPublicBanners,
  });
};
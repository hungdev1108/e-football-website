import { usePublicSettings, usePublicLogo, usePublicBanners } from './useAdminSystem';

// Main public hooks using new endpoints
export const useSystemSettings = usePublicSettings;
export const useSystemLogo = usePublicLogo;
export const useSystemBanners = usePublicBanners;

// Legacy hooks for backward compatibility
export const useLogo = usePublicLogo;
export const useBanners = usePublicBanners;

// Additional utility hooks for specific use cases
export const useHeaderData = () => {
  const { data: logoData, isLoading: logoLoading } = useSystemLogo();
  const { data: settingsData, isLoading: settingsLoading } = useSystemSettings();
  
  return {
    logo: logoData?.data,
    siteName: settingsData?.data?.siteName,
    isLoading: logoLoading || settingsLoading
  };
};

export const useFooterData = () => {
  const { data: settingsData, isLoading } = useSystemSettings();
  
  return {
    contactInfo: settingsData?.data?.contactInfo,
    socialMedia: settingsData?.data?.socialMedia,
    bankingInfo: settingsData?.data?.bankingInfo,
    isLoading
  };
};

export const useHomeBanners = () => {
  const { data: bannersData, isLoading } = useSystemBanners();
  
  return {
    banners: (bannersData?.data as Array<{ isActive: boolean }>)?.filter((banner) => banner.isActive) || [],
    isLoading
  };
};

// Hook for payment information
export const usePaymentInfo = () => {
  const { data: settingsData, isLoading } = useSystemSettings();
  
  const bankingInfo = settingsData?.data?.bankingInfo as {
    bankName?: string;
    accountNumber?: string;
    accountHolder?: string;
    qrCodeImage?: {
      url: string;
      alt: string;
    };
  };
  
  return {
    bankingInfo,
    qrCodeImage: bankingInfo?.qrCodeImage,
    isLoading
  };
};
// Admin API Response Types
export interface AdminApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Account Management
export interface AdminAccountFormData {
  title: string;
  description: string;
  price: number;
  category: string;
  accountCode: string;
  collectiveStrength: number;
  status: "available" | "sold" | "reserved";
  accountDetails: {
    platform: string;
    coins: number;
    gp: number;
    players: string[];
  };
  images: { url: string; alt: string }[];
}

export interface AdminAccountUpdateData extends Partial<AdminAccountFormData> {
  id: string;
}

// News Management
export interface AdminNewsFormData {
  title: string;
  content: string;
  excerpt?: string;
  status: "draft" | "published" | "archived";
  isFeatured: boolean;
  featuredImage: {
    url: string;
    alt: string;
  };
  tags: string[];
}

export interface AdminNewsUpdateData extends Partial<AdminNewsFormData> {
  id: string;
}

// System Settings - Updated to match backend schema
export interface SystemSettings {
  // Site Information
  siteName?: string;
  siteDescription?: string;
  siteKeywords?: string;
  siteUrl?: string;
  
  // Logo
  logo?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  
  // Banners
  banners?: Array<{
    title: string;
    description?: string;
    image: string;
    link?: string;
    isActive: boolean;
    order: number;
  }>;
  
  // Contact Information
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
    workingHours?: string;
  };
  
  // Social Media
  socialMedia?: {
    facebook?: string;
    telegram?: string;
    zalo?: string;
    youtube?: string;
    discord?: string;
  };
  
  // Banking Information
  bankingInfo?: {
    bankName?: string;
    accountNumber?: string;
    accountHolder?: string;
    qrCodeImage?: {
      url: string;
      alt: string;
    };
  };
  
  // SEO Settings
  seoSettings?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    ogImage?: string;
    canonicalUrl?: string;
  };
  
  // Features
  features?: {
    enableRegistration?: boolean;
    enableCart?: boolean;
    enableReviews?: boolean;
    maintenanceMode?: boolean;
    enableNotifications?: boolean;
  };
  
  // Maintenance
  maintenanceMessage?: string;
  
  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}

export interface SystemSettingsFormData {
  // Site Information
  siteName: string;
  siteDescription: string;
  siteKeywords: string;
  siteUrl: string;
  
  // Contact Information
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    workingHours?: string;
  };
  
  // Social Media
  socialMedia: {
    facebook: string;
    telegram: string;
    zalo: string;
    youtube: string;
    discord: string;
  };
  
  // Banking Information
  bankingInfo: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  
  // SEO Settings
  seoSettings?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    ogImage?: string;
    canonicalUrl?: string;
  };
  
  // Features
  features?: {
    enableRegistration?: boolean;
    enableCart?: boolean;
    enableReviews?: boolean;
    maintenanceMode?: boolean;
    enableNotifications?: boolean;
  };
  
  // Maintenance
  maintenanceMessage?: string;
}

export interface SystemSetting {
  _id: string;
  key: string;
  value: any;
  type: string;
  description?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  _id: string;
  title: string;
  description?: string;
  image: string;
  link?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface BannerFormData {
  title: string;
  description?: string;
  image: string;
  link?: string;
  order: number;
}

// Error Response
export interface AdminErrorResponse {
  response?: {
    data: {
      message: string;
    };
  };
}

// Upload Response
export interface UploadResponse {
  url: string;
  filename: string;
}

// Query Parameters
export interface AdminQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  category?: string;
}
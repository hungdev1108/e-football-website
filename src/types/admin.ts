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
    level: number;
    coins: number;
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

// System Settings
export interface SystemSettings {
  siteName?: string;
  siteDescription?: string;
  siteKeywords?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  socialLinks?: {
    facebook?: string;
    youtube?: string;
    discord?: string;
  };
  maintenanceMode?: boolean;
  maintenanceMessage?: string;
}

export interface Banner {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
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
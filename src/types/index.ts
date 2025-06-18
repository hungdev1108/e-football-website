// User & Authentication Types
export interface User {
  _id: string;
  username: string;
  email: string;
  fullName?: string;
  role: 'user' | 'seller' | 'admin';
  balance?: number;
  emailVerified?: boolean;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Game Account Types from API
export interface ApiGameAccount {
  _id: string;
  title: string;
  accountCode: string;
  description: string;
  price: number;
  category: {
    _id: string;
    name: string;
  };
  seller: {
    _id: string;
    username: string;
    fullName: string;
  };
  images: Array<{
    url: string;
    alt: string;
  }>;
  collectiveStrength: number;
  accountDetails: {
    platform: 'steam' | 'mobile' | 'ps4' | 'ps5' | 'xbox';
    level: number;
    coins: number;
    gp: number;
    players: string[];
  };
  status: 'available' | 'sold' | 'pending';
  featured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

// Account Data interface for admin operations
export interface AccountData {
  _id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  accountCode: string;
  collectiveStrength: number;
  status: "available" | "sold" | "reserved";
  featured: boolean;
  accountDetails: {
    platform: string;
    coins: number;
    gp: number;
    players: string[];
  };
  images: { url: string; alt: string }[];
}

// Legacy GameAccount type for compatibility
export interface GameAccount {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: GameAccountCategory;
  platform: 'PC' | 'MOBILE' | 'CONSOLE';
  rating: number;
  level: number;
  players: Player[];
  formation: string;
  isAvailable: boolean;
  sellerId: string;
  seller: {
    username: string;
    rating: number;
    totalSales: number;
  };
  specifications: AccountSpecification[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  rating: number;
  nationality: string;
  club: string;
  imageUrl?: string;
}

export interface AccountSpecification {
  key: string;
  value: string;
  type: 'text' | 'number' | 'boolean' | 'list';
}

// Category from API
export interface ApiCategory {
  _id: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive';
  icon?: string;
  accountCount?: number;
}

// Legacy category type
export interface GameAccountCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
}

// News Types from API
export interface ApiNews {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
    fullName: string;
  };
  featuredImage: {
    url: string;
    alt: string;
  };
  status: 'published' | 'draft';
  featured: boolean;
  views: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt?: string;
}

// System Types from API
export interface ApiBanner {
  _id: string;
  title: string;
  image: string;
  link: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiLogo {
  url: string;
  alt: string;
}

// Direct Purchase Types (replacing cart functionality)
export interface PurchaseRequest {
  accountId: string;
  buyerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  paymentMethod: PaymentMethod;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  user: User;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  shippingAddress?: Address;
  billingAddress?: Address;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  accountId: string;
  account: GameAccount;
  quantity: number;
  price: number;
  total: number;
}

export type OrderStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'PROCESSING' 
  | 'SHIPPED' 
  | 'DELIVERED' 
  | 'CANCELLED' 
  | 'REFUNDED';

export type PaymentStatus = 
  | 'PENDING' 
  | 'PROCESSING' 
  | 'COMPLETED' 
  | 'FAILED' 
  | 'CANCELLED' 
  | 'REFUNDED';

export type PaymentMethod = 
  | 'CREDIT_CARD' 
  | 'BANK_TRANSFER' 
  | 'MOMO' 
  | 'ZALOPAY' 
  | 'VNPAY' 
  | 'PAYPAL';

// Address Types
export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

// Search & Filter Types
export interface SearchFilters {
  category?: string;
  platform?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  maxRating?: number;
  minLevel?: number;
  maxLevel?: number;
  isAvailable?: boolean;
  sortBy?: 'price' | 'rating' | 'level' | 'createdAt' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResults {
  accounts: GameAccount[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  filters: SearchFilters;
}

// API Response Types matching backend
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

// Pagination response from API
export interface ApiPaginatedResponse<T = unknown> {
  success: boolean;
  data: {
    accounts?: T[];
    news?: T[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AccountFilterForm {
  category: string;
  platform: string;
  priceRange: [number, number];
  ratingRange: [number, number];
  levelRange: [number, number];
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'ORDER_UPDATE' | 'PAYMENT_SUCCESS' | 'ACCOUNT_AVAILABLE' | 'PROMOTION' | 'SYSTEM';
  title: string;
  message: string;
  isRead: boolean;
  data?: Record<string, unknown>;
  createdAt: Date;
}

// Admin Types
export interface AdminStats {
  totalUsers: number;
  totalAccounts: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: Order[];
  topSellingAccounts: GameAccount[];
  userGrowth: Array<{ date: string; count: number }>;
  revenueGrowth: Array<{ date: string; amount: number }>;
}


export interface News {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  featuredImage?: {
    url: string;
    alt: string;
  };
  tags: string[];
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  // ✅ LOẠI BỎ: author: User;
}
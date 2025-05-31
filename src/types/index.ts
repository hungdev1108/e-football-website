// User & Authentication Types
export interface User {
  id: string;
  email: string;
  username: string;
  displayName?: string;
  avatar?: string;
  role: 'USER' | 'ADMIN';
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Game Account Types
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

export interface GameAccountCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
}

// Shopping Cart Types
export interface CartItem {
  id: string;
  accountId: string;
  account: GameAccount;
  quantity: number;
  addedAt: Date;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
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

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
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
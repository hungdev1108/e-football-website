// App Configuration
export const APP_CONFIG = {
  name: 'EFOOTBALL Store',
  description: 'Chuyên thu mua bán ảnh eFootball chất lượng cao',
  version: '1.0.0',
  author: 'EFOOTBALL Store Team',
  keywords: ['efootball', 'ảnh efootball', 'thu mua bán ảnh', 'fifa', 'football', 'gaming'],
} as const;

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.hieptranefootball.com/api',
  timeout: 10000,
  maxRetries: 3,
} as const;

// Pagination
export const PAGINATION = {
  defaultPageSize: 12,
  pageSizeOptions: [12, 24, 48, 96],
  maxPageSize: 100,
} as const;

// Platform Options - CẬP NHẬT ĐỂ KHỚP VỚI BACKEND
export const PLATFORMS = [
  { value: 'steam', label: 'Steam' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'ps4', label: 'PlayStation 4' },
  { value: 'ps5', label: 'PlayStation 5' },
  { value: 'xbox', label: 'Xbox' },
] as const;

// Helper function để get platform label
export const getPlatformLabel = (platform: string) => {
  const platformObj = PLATFORMS.find(p => p.value === platform);
  return platformObj ? platformObj.label : platform;
};

// Game Account Categories
export const ACCOUNT_CATEGORIES = [
  { value: 'starter', label: 'Tài khoản Starter', color: 'green' },
  { value: 'mid-tier', label: 'Tài khoản Trung cấp', color: 'blue' },
  { value: 'high-tier', label: 'Tài khoản Cao cấp', color: 'purple' },
  { value: 'premium', label: 'Tài khoản Premium', color: 'gold' },
  { value: 'legendary', label: 'Tài khoản Huyền thoại', color: 'red' },
] as const;

// Price Ranges (in VND)
export const PRICE_RANGES = [
  { min: 0, max: 100000, label: 'Dưới 100K' },
  { min: 100000, max: 300000, label: '100K - 300K' },
  { min: 300000, max: 500000, label: '300K - 500K' },
  { min: 500000, max: 1000000, label: '500K - 1M' },
  { min: 1000000, max: 9000000, label: '1M - 9M' },
  { min: 9000000, max: 10000000, label: '9M - 10M' },
  { min: 10000000, max: Infinity, label: 'Trên 10M' },
] as const;

// Rating Ranges
export const RATING_RANGES = [
  { min: 0, max: 2000, label: 'Dưới 2000' },
  { min: 2000, max: 2500, label: '2000 - 2500' },
  { min: 2500, max: 3000, label: '2500 - 3000' },
  { min: 3000, max: 3500, label: '3000 - 3500' },
  { min: 3500, max: 4000, label: '3500 - 4000' },
  { min: 4000, max: Infinity, label: 'Trên 4000' },
] as const;

// Sort Options
export const SORT_OPTIONS = [
  { value: 'createdAt:desc', label: 'Mới nhất' },
  { value: 'price:asc', label: 'Giá thấp đến cao' },
  { value: 'price:desc', label: 'Giá cao đến thấp' },
  { value: 'rating:desc', label: 'Rating cao nhất' },
  { value: 'level:desc', label: 'Level cao nhất' },
  { value: 'popularity:desc', label: 'Phổ biến nhất' },
] as const;

// Order Status
export const ORDER_STATUS_LABELS = {
  PENDING: { label: 'Chờ xử lý', color: 'yellow', icon: 'Clock' },
  CONFIRMED: { label: 'Đã xác nhận', color: 'blue', icon: 'CheckCircle' },
  PROCESSING: { label: 'Đang xử lý', color: 'orange', icon: 'Loader' },
  SHIPPED: { label: 'Đã giao', color: 'purple', icon: 'Truck' },
  DELIVERED: { label: 'Hoàn thành', color: 'green', icon: 'Package' },
  CANCELLED: { label: 'Đã hủy', color: 'red', icon: 'X' },
  REFUNDED: { label: 'Đã hoàn tiền', color: 'gray', icon: 'RefreshCw' },
} as const;

// Payment Status
export const PAYMENT_STATUS_LABELS = {
  PENDING: { label: 'Chờ thanh toán', color: 'yellow', icon: 'Clock' },
  PROCESSING: { label: 'Đang xử lý', color: 'blue', icon: 'Loader' },
  COMPLETED: { label: 'Thành công', color: 'green', icon: 'CheckCircle' },
  FAILED: { label: 'Thất bại', color: 'red', icon: 'X' },
  CANCELLED: { label: 'Đã hủy', color: 'gray', icon: 'XCircle' },
  REFUNDED: { label: 'Đã hoàn tiền', color: 'purple', icon: 'RefreshCw' },
} as const;

// Payment Methods
export const PAYMENT_METHODS = [
  { value: 'MOMO', label: 'MoMo', icon: '💳', color: 'pink' },
  { value: 'ZALOPAY', label: 'ZaloPay', icon: '💰', color: 'blue' },
  { value: 'VNPAY', label: 'VNPay', icon: '🏦', color: 'red' },
  { value: 'BANK_TRANSFER', label: 'Chuyển khoản ngân hàng', icon: '🏧', color: 'green' },
  { value: 'CREDIT_CARD', label: 'Thẻ tín dụng', icon: '💳', color: 'purple' },
  { value: 'PAYPAL', label: 'PayPal', icon: '💱', color: 'blue' },
] as const;

// Navigation Links
export const NAVIGATION_LINKS = [
  { href: '/', label: 'Trang chủ', icon: 'Home' },
  { href: '/search', label: 'Tìm kiếm', icon: 'Search' },
  { href: '/categories', label: 'Danh mục', icon: 'Grid' },
  { href: '/featured', label: 'Nổi bật', icon: 'Star' },
  { href: '/contact', label: 'Liên hệ', icon: 'MessageCircle' },
] as const;

// Footer Links
export const FOOTER_LINKS = {
  company: [
    { href: '/about', label: 'Về chúng tôi' },
    { href: '/contact', label: 'Liên hệ' },
    { href: '/careers', label: 'Tuyển dụng' },
    { href: '/blog', label: 'Blog' },
  ],
  support: [
    { href: '/help', label: 'Trợ giúp' },
    { href: '/faq', label: 'FAQ' },
    { href: '/shipping', label: 'Giao hàng' },
    { href: '/returns', label: 'Đổi trả' },
  ],
  legal: [
    { href: '/privacy', label: 'Chính sách bảo mật' },
    { href: '/terms', label: 'Điều khoản sử dụng' },
    { href: '/cookies', label: 'Chính sách Cookie' },
  ],
} as const;

// Social Media Links
export const SOCIAL_LINKS = [
  { platform: 'facebook', url: 'https://facebook.com', icon: 'Facebook' },
  { platform: 'twitter', url: 'https://twitter.com', icon: 'Twitter' },
  { platform: 'instagram', url: 'https://instagram.com', icon: 'Instagram' },
  { platform: 'youtube', url: 'https://youtube.com', icon: 'Youtube' },
  { platform: 'discord', url: 'https://discord.com', icon: 'MessageCircle' },
] as const;

// File Upload
export const FILE_UPLOAD = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxFiles: 10,
} as const;

// Validation
export const VALIDATION = {
  password: {
    minLength: 8,
    maxLength: 128,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  username: {
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9_]+$/,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
} as const;

// Cache Keys
export const CACHE_KEYS = {
  auth: 'auth-storage',
  theme: 'theme-storage',
  language: 'language-storage',
  recentSearch: 'recent-search-storage',
} as const;
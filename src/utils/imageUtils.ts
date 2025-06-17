/**
 * Utility functions for handling image URLs from backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://14.225.211.212:5002/api';
const BACKEND_BASE_URL = API_BASE_URL.replace('/api', '');

/**
 * Convert relative image URL from backend to absolute URL
 * @param imageUrl - Image URL from backend (can be relative or absolute)
 * @returns Absolute image URL
 */
export function getImageUrl(imageUrl: string): string {
  if (!imageUrl) {
    return getPlaceholderUrl();
  }

  // If already absolute URL, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // If relative URL, prepend backend base URL
  if (imageUrl.startsWith('/')) {
    return `${BACKEND_BASE_URL}${imageUrl}`;
  }

  // If no leading slash, add it
  return `${BACKEND_BASE_URL}/${imageUrl}`;
}

/**
 * Get placeholder image URL
 * @param width - Image width
 * @param height - Image height
 * @param text - Optional text to display
 * @returns Placeholder image URL
 */
export function getPlaceholderUrl(
  width: number = 300, 
  height: number = 200, 
  text?: string
): string {
  const placeholderText = text || `${width}x${height}`;
  return `https://via.placeholder.com/${width}x${height}/e2e8f0/64748b?text=${encodeURIComponent(placeholderText)}`;
}

/**
 * Get optimized image URL with size parameters
 * @param imageUrl - Original image URL
 * @param width - Desired width
 * @param height - Desired height
 * @param quality - Image quality (1-100)
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  imageUrl: string,
  width?: number,
  height?: number,
  quality: number = 80
): string {
  const baseUrl = getImageUrl(imageUrl);
  
  if (!baseUrl || baseUrl.includes('placeholder')) {
    return baseUrl;
  }

  // If using a CDN that supports image optimization
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  if (quality !== 80) params.append('q', quality.toString());

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Validate image file
 * @param file - File to validate
 * @param maxSize - Maximum file size in bytes (default 5MB)
 * @returns Validation result
 */
export function validateImageFile(
  file: File,
  maxSize: number = 5 * 1024 * 1024 // 5MB
): { isValid: boolean; error?: string } {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Chỉ hỗ trợ file ảnh định dạng JPG, PNG, WEBP'
    };
  }

  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = maxSize / (1024 * 1024);
    return {
      isValid: false,
      error: `Kích thước file không được vượt quá ${maxSizeMB}MB`
    };
  }

  return { isValid: true };
}

/**
 * Create image preview URL from File
 * @param file - Image file
 * @returns Promise with preview URL
 */
export function createImagePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    
    reader.onerror = () => {
      reject(new Error('Không thể tạo preview ảnh'));
    };
    
    reader.readAsDataURL(file);
  });
}

/**
 * Cleanup object URL to prevent memory leaks
 * @param url - Object URL to cleanup
 */
export function cleanupImagePreview(url: string): void {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}
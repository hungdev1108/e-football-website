/**
 * Image utilities for handling URLs and placeholders
 */

/**
 * Get optimized image URL
 * @param url - Original image URL
 * @returns Optimized image URL
 */
export function getImageUrl(url: string): string {
  // If it's already a full URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If it's a relative path, add base URL if needed
  if (url.startsWith('/')) {
    return url;
  }
  
  // Add leading slash if missing
  return `/${url}`;
}

/**
 * Get placeholder image URL
 * @param width - Image width
 * @param height - Image height
 * @param text - Optional text to display
 * @returns Placeholder image URL
 */
export function getPlaceholderUrl(
  width: number, 
  height: number, 
  text?: string
): string {
  const placeholderText = text || `${width}x${height}`;
  return `https://via.placeholder.com/${width}x${height}/f3f4f6/6b7280?text=${encodeURIComponent(placeholderText)}`;
}

/**
 * Get optimized image URL with Next.js Image optimization
 * @param src - Source image URL
 * @param width - Target width
 * @param quality - Image quality (1-100)
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  src: string, 
  width?: number, 
  quality: number = 75
): string {
  const params = new URLSearchParams();
  
  if (width) {
    params.set('w', width.toString());
  }
  
  if (quality !== 75) {
    params.set('q', quality.toString());
  }
  
  const queryString = params.toString();
  const baseUrl = getImageUrl(src);
  
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Check if image URL is valid
 * @param url - Image URL to check
 * @returns Promise<boolean>
 */
export async function isValidImageUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok && response.headers.get('content-type')?.startsWith('image/') === true;
  } catch {
    return false;
  }
}

/**
 * Get image dimensions from URL
 * @param url - Image URL
 * @returns Promise<{width: number, height: number} | null>
 */
export function getImageDimensions(url: string): Promise<{width: number, height: number} | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      resolve(null);
    };
    img.src = url;
  });
} 
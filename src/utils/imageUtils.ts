/**
 * Utility functions for handling image URLs from backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api';
const BACKEND_BASE_URL = API_BASE_URL.replace('/api', '');

/**
 * Convert relative image URL from backend to absolute URL
 * @param imageUrl - Image URL from backend (can be relative or absolute)
 * @returns Absolute image URL
 */
export function getImageUrl(imageUrl: string): string {
  if (!imageUrl) {
    return '/api/placeholder/300/200';
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
 * @returns Placeholder image URL
 */
export function getPlaceholderUrl(width: number = 300, height: number = 200): string {
  return `/api/placeholder/${width}/${height}`;
} 
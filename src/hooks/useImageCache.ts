import { useState, useEffect } from 'react';

interface CachedImage {
  url: string;
  timestamp: number;
  data?: string;
}

const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export function useImageCache(imageUrl: string | null) {
  const [cachedImage, setCachedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!imageUrl) return;

    const cacheKey = `img_cache_${imageUrl}`;

    // Try to get from localStorage first
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsedCache: CachedImage = JSON.parse(cached);
      const now = Date.now();

      // Check if cache is still valid
      if (now - parsedCache.timestamp < CACHE_EXPIRY) {
        setCachedImage(parsedCache.data || imageUrl);
        return;
      } else {
        // Remove expired cache
        localStorage.removeItem(cacheKey);
      }
    }

    // If not in cache or expired, fetch and cache the image
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const cacheData: CachedImage = {
        url: imageUrl,
        timestamp: Date.now(),
      };

      try {
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
        setCachedImage(imageUrl);
      } catch (error) {
        console.warn('Failed to cache image:', error);
        setCachedImage(imageUrl);
      }
    };

    img.onerror = () => {
      console.warn('Failed to load image:', imageUrl);
      setCachedImage(null);
    };
  }, [imageUrl]);

  return cachedImage;
}
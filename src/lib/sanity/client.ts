import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

if (!projectId) {
  throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not defined in environment variables.');
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-30',
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production only
  perspective: 'published',
  stega: false, // Disable stega for better performance
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder
    .image(source)
    .auto('format')
    .fit('max')
    .quality(80); // Optimize quality for better performance while maintaining good visuals
}

// Custom image loader for Next.js Image component
export function sanityImageLoader({ src, width, quality }: { src: string; width?: number; quality?: number }) {
  const imageUrl = new URL(src);
  
  if (width) {
    imageUrl.searchParams.set('w', width.toString());
  }
  
  if (quality) {
    imageUrl.searchParams.set('q', quality.toString());
  }

  // Add cache-control headers through URL params
  imageUrl.searchParams.set('cache', 'true');
  
  return imageUrl.toString();
}
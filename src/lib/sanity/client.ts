import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Check if environment variables are defined
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

if (!projectId) {
  throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not defined in environment variables.');
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-30',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
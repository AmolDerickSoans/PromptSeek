// lib/sanity.client.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-30',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// lib/queries.ts
export const heroCarouselQuery = `
  *[_type == "post" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    excerpt,
    mainImage,
    "slug": slug.current,
    views,
    readingTime,
    publishedAt,
    "tags": tags[]->title
  }[0...5]
`

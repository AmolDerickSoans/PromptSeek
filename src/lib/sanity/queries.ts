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
export const allBlogsQuery = `{
    "blogs": *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      "tags": tags[]->title,
      "author": author->{
        name,
        "slug": slug.current
      },
      publishedAt,
      readingTime
    },
    "authors": *[_type == "author"] {
      name,
      "slug": slug.current
    }
  }`
  
  export const filteredBlogsQuery = `{
    "blogs": *[_type == "post" && 
      ($authorSlug == "all" || author->slug.current == $authorSlug) &&
      ($readingTime == "all" || 
        ($readingTime == "short" && readingTime < 5) ||
        ($readingTime == "medium" && readingTime >= 5 && readingTime <= 15) ||
        ($readingTime == "long" && readingTime > 15)
      ) &&
      ($dateRange == "all" || 
        ($dateRange == "today" && publishedAt >= dateTime(now() - 1000 * 60 * 60 * 24)) ||
        ($dateRange == "this-week" && publishedAt >= dateTime(now() - 1000 * 60 * 60 * 24 * 7)) ||
        ($dateRange == "this-month" && publishedAt >= dateTime(now() - 1000 * 60 * 60 * 24 * 30)) ||
        ($dateRange == "this-year" && publishedAt >= dateTime(now() - 1000 * 60 * 60 * 24 * 365))
      )
    ] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      "tags": tags[]->title,
      "author": author->{
        name,
        "slug": slug.current
      },
      publishedAt,
      readingTime
    },
    "authors": *[_type == "author"] {
      name,
      "slug": slug.current
    }
  }`
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
      ($authorSlug == "" || author->slug.current == $authorSlug) &&
      ($readingTime == "" || 
        ($readingTime == "0-5" && readingTime <= 5) ||
        ($readingTime == "5-10" && readingTime > 5 && readingTime <= 10) ||
        ($readingTime == "10+" && readingTime > 10)
      ) &&
      ($dateRange == "" || 
        ($dateRange == "last-week" && publishedAt >= dateTime(now()) - 60*60*24*7) &&
        ($dateRange == "last-month" && publishedAt >= dateTime(now()) - 60*60*24*30) &&
        ($dateRange == "last-year" && publishedAt >= dateTime(now()) - 60*60*24*365)
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
    }
  }`
export interface Author {
    name: string
    slug: string
  }
  
  export interface Blog {
    _id: string
    title: string
    excerpt: string
    slug: string
    imageUrl: string
    tags: string[]
    author: Author
    publishedAt: string
    readingTime: number
  }
  
  export interface FilterState {
    dateRange: string
    authorSlug: string
    readingTime: string
    searchTerm: string
  }
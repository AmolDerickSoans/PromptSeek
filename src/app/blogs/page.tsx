// app/blog/page.tsx
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import BlogCard from "@/components/BlogCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { client } from "@/lib/sanity/client"
import { useDebounce } from "@/hooks/useDebounce"
import { Blog } from "@/types/blog"

// Updated interfaces based on Sanity schema
interface Author {
  _id: string
  name: string
  slug: string
}

// interface Blog {
//   _id: string
//   title: string
//   excerpt: string
//   slug: string 
//   imageUrl: string
//   author: Author
//   publishedAt: string
//   readingTime: number
//   tags: Array<{ _id: string; title: string }>
//   featured: boolean
//   views: number
// }

// Define filter options based on schema
const DATE_FILTERS = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "this-week", label: "This Week" },
  { value: "this-month", label: "This Month" },
  { value: "this-year", label: "This Year" }
]

const READING_TIME_FILTERS = [
  { value: "all", label: "Any Length" },
  { value: "short", label: "Short (< 5 min)" },
  { value: "medium", label: "Medium (5-15 min)" },
  { value: "long", label: "Long (> 15 min)" }
]

export default function ViewAllBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    dateRange: "all",
    authorSlug: "all",
    readingTime: "all",
    searchTerm: "",
  })

  const debouncedSearchTerm = useDebounce(filters.searchTerm, 500)

  // Updated Sanity query builder
  const buildSanityQuery = () => {
    let query = `{
      "blogs": *[_type == "post"`;

    // Filter conditions
    const conditions = []

    // Date range filter
    if (filters.dateRange !== "all") {
      const dateConditions: { [key: string]: string } = {
        "today": "dateTime(now()) - 60*60*24",
        "this-week": "dateTime(now()) - 60*60*24*7",
        "this-month": "dateTime(now()) - 60*60*24*30",
        "this-year": "dateTime(now()) - 60*60*24*365"
      }
      if (dateConditions[filters.dateRange]) {
        conditions.push(`publishedAt >= ${dateConditions[filters.dateRange]}`)
      }
    }

    // Author filter
    if (filters.authorSlug !== "all") {
      conditions.push(`author->slug.current == "${filters.authorSlug}"`)
    }

    // Reading time filter
    const readingTimeConditions: { [key: string]: string } = {
      "short": "readingTime < 5",
      "medium": "readingTime >= 5 && readingTime <= 15",
      "long": "readingTime > 15"
    }
    if (filters.readingTime !== "all" && readingTimeConditions[filters.readingTime]) {
      conditions.push(readingTimeConditions[filters.readingTime])
    }

    // Add conditions to query
    if (conditions.length > 0) {
      query += ` && ${conditions.join(" && ")}`
    }

    // Close the query and add selections
    query += `] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      "author": author->{
        _id,
        name,
        "slug": slug.current
      },
      publishedAt,
      readingTime,
      "tags": tags[]->{ _id, title },
      views,
      featured
    },
    "authors": *[_type == "author"] {
      _id,
      name,
      "slug": slug.current
    }
  }`

    return query
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const query = buildSanityQuery()
        const data = await client.fetch(query)
        
        // Apply search filter client-side for better performance
        let filteredBlogs = data.blogs
        if (debouncedSearchTerm) {
          const searchTermLower = debouncedSearchTerm.toLowerCase()
          filteredBlogs = data.blogs.filter((blog: Blog) =>
            blog.title.toLowerCase().includes(searchTermLower) ||
            blog.excerpt.toLowerCase().includes(searchTermLower)
          )
        }
        
        setBlogs(filteredBlogs)
        setAuthors(data.authors)
        setCurrentPage(1)
      } catch (error) {
        console.error("Error fetching blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [filters.dateRange, filters.authorSlug, filters.readingTime, debouncedSearchTerm])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Pagination logic
  const BLOGS_PER_PAGE = 5 // Changed from 10 to 5 for default view
  const indexOfLastBlog = currentPage * BLOGS_PER_PAGE
  const indexOfFirstBlog = indexOfLastBlog - BLOGS_PER_PAGE
  const currentBlogs = blogs.slice(0, BLOGS_PER_PAGE) // Show first 5 blogs by default
  const pageCount = Math.ceil(blogs.length / BLOGS_PER_PAGE)

  // Query for featured blogs
  const buildFeaturedBlogsQuery = () => {
    return `*[_type == "post" && featured == true] | order(publishedAt desc)[0...4] {
      _id,
      title,
      excerpt,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      "author": author->{
        _id,
        name,
        "slug": slug.current
      },
      publishedAt,
      readingTime,
      "tags": tags[]->{ _id, title },
      views,
      featured
    }`
  }

  useEffect(() => {
    async function fetchFeaturedBlogs() {
      try {
        const query = buildFeaturedBlogsQuery()
        const data = await client.fetch(query)
        setFeaturedBlogs(data)
      } catch (error) {
        console.error("Error fetching featured blogs:", error)
      }
    }

    fetchFeaturedBlogs()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Best of the Week Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-5xl font-bold tracking-tight">Best of the week</h2>
          <Link href="/blog" className="text-sm hover:underline">See all posts →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBlogs.map((blog, index) => (
            <Link href={`/blog/${blog.slug}`} key={blog._id} 
              className={`relative overflow-hidden rounded-xl ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''} 
              group hover:shadow-lg transition-all duration-300 ease-in-out`}>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-6 w-full">
                    <div className="flex gap-2 mb-2">
                      {blog.tags.slice(0, 2).map(tag => (
                        <Badge key={tag._id} variant="secondary" className="bg-white/10 text-white">
                          {tag.title}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="inline text-xl md:text-2xl font-bold mb-2">
                      <span className="box-decoration-clone bg-secondary text-primary px-3 py-1 rounded-sm leading-[1.6]">
                        {blog.title}
                      </span>
                    </h3>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-white/60 text-sm">{formatDate(blog.publishedAt)}</span>
                        <span className="text-white/60">•</span>
                        <span className="text-white/60 text-sm">{blog.readingTime} min read</span>
                      </div>
                      <div className="bg-white/10 p-3 rounded-full transform transition-transform duration-300 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <h1 className="text-3xl font-bold mb-8">All Blogs</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          
          {/* Date Range Filter */}
          <div>
            <h3 className="font-medium mb-2">Date Range</h3>
            <Select
              value={filters.dateRange}
              onValueChange={(value) => setFilters({ ...filters, dateRange: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                {DATE_FILTERS.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Author Filter */}
          <div>
            <h3 className="font-medium mb-2">Author</h3>
            <Select
              value={filters.authorSlug}
              onValueChange={(value) => setFilters({ ...filters, authorSlug: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Authors</SelectItem>
                {authors.map((author) => (
                  <SelectItem key={author._id} value={author.slug}>
                    {author.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reading Time Filter */}
          <div>
            <h3 className="font-medium mb-2">Reading Time</h3>
            <Select
              value={filters.readingTime}
              onValueChange={(value) => setFilters({ ...filters, readingTime: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select reading time" />
              </SelectTrigger>
              <SelectContent>
                {READING_TIME_FILTERS.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </aside>

        <main className="w-full md:w-3/4">
          <div className="mb-6">
            <Input
              placeholder="Search blogs..."
              value={filters.searchTerm}
              onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
              className="max-w-md"
            />
          </div>
          
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <>
              <div className="space-y-4">
           
                {currentBlogs.map((blog) => (
                  <div key={blog._id}>
                  <BlogCard
                    title={blog.title}
                    excerpt={blog.excerpt}
                    image={blog.imageUrl}
                    tags={blog.tags.map(tag => tag.title)}
                    author={blog.author.name}
                    date={formatDate(blog.publishedAt)}
                    slug={blog.slug}
                  />
                  </div>
                ))}
              </div>
              
              {currentBlogs.length === 0 && (
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                  <Button onClick={() => setFilters({
                    dateRange: "all",
                    authorSlug: "all",
                    readingTime: "all",
                    searchTerm: "",
                  })}>Reset Filters</Button>
                </div>
              )}
              
              {currentBlogs.length > 0 && (
                <div className="mt-8 flex justify-center space-x-2">
                  {Array.from({ length: pageCount }, (_, i) => i + 1).map((number) => (
                    <Button
                      key={number}
                      variant={currentPage === number ? "default" : "outline"}
                      onClick={() => setCurrentPage(number)}
                    >
                      {number}
                    </Button>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
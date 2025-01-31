// app/blog/page.tsx
"use client"

import { useState, useEffect } from "react"
import BlogCard from "@/components/BlogCard"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { client } from "@/lib/sanity/client"
import { allBlogsQuery, filteredBlogsQuery } from "@/lib/sanity/queries"
import { Blog, Author, FilterState } from "@/types/blog"
import { useDebounce } from "@/hooks/useDebounce"

const BLOGS_PER_PAGE = 10

export default function ViewAllBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    dateRange: "",
    authorSlug: "",
    readingTime: "",
    searchTerm: "",
  })

  const debouncedSearchTerm = useDebounce(filters.searchTerm, 500)

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const data = await client.fetch(allBlogsQuery)
        setBlogs(data.blogs)
        setAuthors(data.authors)
      } catch (error) {
        console.error("Error fetching blogs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchInitialData()
  }, [])

  useEffect(() => {
    async function fetchFilteredBlogs() {
      setLoading(true)
      try {
        const data = await client.fetch(filteredBlogsQuery, {
          dateRange: filters.dateRange,
          authorSlug: filters.authorSlug,
          readingTime: filters.readingTime,
        })
        
        // Apply search filter client-side
        const filteredBlogs = data.blogs.filter((blog: Blog) =>
          blog.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        )
        
        setBlogs(filteredBlogs)
        setCurrentPage(1)
      } catch (error) {
        console.error("Error fetching filtered blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    if (filters.dateRange || filters.authorSlug || filters.readingTime || debouncedSearchTerm) {
      fetchFilteredBlogs()
    }
  }, [filters.dateRange, filters.authorSlug, filters.readingTime, debouncedSearchTerm])

  const indexOfLastBlog = currentPage * BLOGS_PER_PAGE
  const indexOfFirstBlog = indexOfLastBlog - BLOGS_PER_PAGE
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog)
  const pageCount = Math.ceil(blogs.length / BLOGS_PER_PAGE)

  const resetFilters = () => {
    setFilters({
      dateRange: "",
      authorSlug: "",
      readingTime: "",
      searchTerm: "",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Blogs</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
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
                <SelectItem value="a">All Time</SelectItem>
                <SelectItem value="last-week">Last Week</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
                <SelectItem value="a">All Authors</SelectItem>
                {authors.map((author) => (
                  <SelectItem key={author.slug} value={author.slug}>
                    {author.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
                <SelectItem value="a">Any Length</SelectItem>
                <SelectItem value="0-5">0-5 minutes</SelectItem>
                <SelectItem value="5-10">5-10 minutes</SelectItem>
                <SelectItem value="10+">10+ minutes</SelectItem>
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
                  <BlogCard
                    key={blog._id}
                    title={blog.title}
                    excerpt={blog.excerpt}
                    image={blog.imageUrl}
                    tags={blog.tags}
                    author={blog.author.name}
                    date={formatDate(blog.publishedAt)}
                  />
                ))}
              </div>
              
              {currentBlogs.length === 0 ? (
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                  <Button onClick={resetFilters}>Reset Filters</Button>
                </div>
              ) : (
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
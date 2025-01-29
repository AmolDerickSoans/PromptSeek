"use client"

import { useState } from "react"
import BlogCard from "@/components/BlogCard"
import SearchAndFilters from "@/components/SearchAndFilters"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for blogs
const blogs = [
  {
    id: 1,
    title: "10 Essential DeepSeek Prompts for Developers",
    excerpt: "Boost your productivity with these powerful DeepSeek prompts.",
    image: "/images/deepseek-prompts.jpg",
    tags: ["AI", "DeepSeek", "Productivity"],
    author: "Jane Doe",
    date: "May 15, 2023",
  },
  // Add more blog objects here...
]

export default function ViewAllBlogs() {
  const [currentPage, setCurrentPage] = useState(1)
  const blogsPerPage = 10

  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(blogs.length / blogsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Blogs</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div>
            <h3 className="font-medium mb-2">Date Range</h3>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-week">Last Week</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="font-medium mb-2">Author</h3>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jane-doe">Jane Doe</SelectItem>
                <SelectItem value="john-smith">John Smith</SelectItem>
                {/* Add more authors */}
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="font-medium mb-2">Reading Time</h3>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select reading time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-5">0-5 minutes</SelectItem>
                <SelectItem value="5-10">5-10 minutes</SelectItem>
                <SelectItem value="10+">10+ minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </aside>
        <main className="w-full md:w-3/4">
          <SearchAndFilters />
          <div className="space-y-4">
            {currentBlogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
          <div className="mt-8 flex justify-center space-x-2">
            {pageNumbers.map((number) => (
              <Button
                key={number}
                variant={currentPage === number ? "default" : "outline"}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </Button>
            ))}
          </div>
          {currentBlogs.length === 0 && (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
              <Button onClick={() => window.location.reload()}>Reset Filters</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}


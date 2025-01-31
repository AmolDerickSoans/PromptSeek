import { useState, useEffect } from "react"
import BlogCard from "@/components/BlogCard"
import { Blog, Author, FilterState } from "@/types/blog"

const NUMBER_OF_BLOGS_IN_LANDING = 5

export default function BlogListing() {

const [blogs,setBlogs] = useState<Blog[]>([])
const [loading,setLoading] = useState(true)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} {...blog} />
      ))}
    </div>
  )
}


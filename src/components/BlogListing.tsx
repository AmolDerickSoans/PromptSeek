import BlogCard from "@/components/BlogCard"

// Mock data for blogs
const blogs = [
  {
    id: 1,
    title: "10 Essential DeepSeek Prompts for Developers",
    excerpt: "Boost your productivity with these powerful DeepSeek prompts.",
    image: "/dummy/hero/lenscape.jpeg",
    tags: ["AI", "DeepSeek", "Productivity"],
    author: "Jane Doe",
    date: "May 15, 2023",
  },
  {
    id: 2,
    title: "Getting Started with Claude API: A Comprehensive Guide",
    excerpt: "Learn how to integrate Claude API into your projects efficiently.",
    image: "/dummy/hero/openloops.jpeg",
    tags: ["API", "Claude", "AI Integration"],
    author: "John Smith",
    date: "May 20, 2023",
  },
  {
    id: 3,
    title: "The Future of AI: Trends to Watch in 2024",
    excerpt: "Explore the upcoming trends that will shape the AI landscape.",
    image: "/dummy/hero/cashfeed.jpeg",
    tags: ["AI", "Future Tech", "Trends"],
    author: "Alice Johnson",
    date: "May 25, 2023",
  },
  // Add more blog objects as needed
]

export default function BlogListing() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} {...blog} />
      ))}
    </div>
  )
}


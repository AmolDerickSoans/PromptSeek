import BlogCard from "@/components/BlogCard"
import { client } from "@/lib/sanity/client"
import { allBlogsQuery } from "@/lib/sanity/queries"
import { Blog } from "@/types/blog"

 
async function getBlogs() {
  const data = await client.fetch(allBlogsQuery)
  return data.blogs
}

export default async function BlogListing() {
  const blogs = await getBlogs()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
      {blogs.map((blog: Blog) => (
        <BlogCard
          key={blog._id}
          title={blog.title}
          excerpt={blog.excerpt}
          image={blog.imageUrl}
          tags={blog.tags.map(tag => tag.title)}
          author={blog.author.name}
          date={formatDate(blog.publishedAt)}
          slug={blog.slug}
        />
      ))}
    </div>
  )
}


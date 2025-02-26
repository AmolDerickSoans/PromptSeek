import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface BlogCardProps {
  title: string
  excerpt: string
  image: string
  tags: string[]
  author: string
  date: string
  slug: string
}

import Link from "next/link"

export default function BlogCard({ title, excerpt, image, tags, author, date, slug }: BlogCardProps) {
  const CardContent = () => (
    <div className="flex items-start space-x-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-shrink-0">
        <Image
          src={image || "/placeholder.jpg"}
          alt={title}
          width={120}
          height={80}
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 mb-2 line-clamp-2">{excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <Badge key={`${tag}-${index}`} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">{date}</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-600 text-sm">{author}</span>
          </div>
          <div className="bg-gray-100 p-3 rounded-full transform transition-transform duration-300 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Link href={`/blog/${slug}`}>
      <CardContent />
    </Link>
  )
}


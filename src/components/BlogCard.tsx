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
        <div className="text-sm text-gray-500">
          {author} • {date}
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


import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface BlogCardProps {
  title: string
  excerpt: string
  image: string
  tags: string[]
  author: string
  date: string
}

export default function BlogCard({ title, excerpt, image, tags, author, date }: BlogCardProps) {
  return (
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
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
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
}


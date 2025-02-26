"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Comment {
  id: number
  author: string
  content: string
  date: string
  replies?: Comment[]
}

const initialComments: Comment[] = [
  {
    id: 1,
    author: "Alice Johnson",
    content: "Great article! I learned a lot about DeepSeek prompt engineering.",
    date: "May 29, 2023",
    replies: [
      {
        id: 2,
        author: "Bob Smith",
        content: "I agree, the techniques shared here are really useful.",
        date: "May 29, 2023",
      },
    ],
  },
  {
    id: 3,
    author: "Charlie Brown",
    content: "Could you elaborate more on the few-shot learning technique?",
    date: "May 30, 2023",
  },
]

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: "Current User",
        content: newComment,
        date: new Date().toLocaleDateString(),
      }
      setComments([...comments, comment])
      setNewComment("")
    }
  }

  const renderComment = (comment: Comment) => (
    <div key={comment.id} className="mb-4">
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage 
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.author}`} 
            loading="lazy"
            sizes="40px"
          />
          <AvatarFallback>{comment.author[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{comment.author}</p>
          <p className="text-sm text-gray-500">{comment.date}</p>
          <p className="mt-1">{comment.content}</p>
        </div>
      </div>
      {comment.replies && <div className="ml-12 mt-2">{comment.replies.map(renderComment)}</div>}
    </div>
  )

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Comments</h3>
      <div className="space-y-4 mb-6">{comments.map(renderComment)}</div>
      <form onSubmit={handleSubmit}>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="mb-2"
        />
        <Button type="submit">Post Comment</Button>
      </form>
    </div>
  )
}


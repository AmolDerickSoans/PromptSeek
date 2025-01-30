// components/HeroCarousel.tsx
"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { urlFor } from "@/lib/sanity/client"
import Link from "next/link"
import { createClient } from 'next-sanity'

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  mainImage: any
  slug: string
  views: number
  readingTime: number
  publishedAt: string
  tags: string[],
  length:number
}

interface HeroCarouselProps {
  posts: BlogPost[]
}

export default function HeroCarousel({ posts }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  if (!Array.isArray(posts) || posts.length === 0) {
    return null
  }

  useEffect(() => {
    if (isAutoplay && posts.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % posts.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoplay, posts.length])

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + posts.length) % posts.length)
    setIsAutoplay(false)
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % posts.length)
    setIsAutoplay(false)
  }

  if (!posts.length) return null

  return (
    <div className="relative w-full h-[500px] mb-8 overflow-hidden rounded-lg">
      {posts.map((post, index) => (
        <div
          key={post._id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
              urlFor(post.mainImage).width(1920).url()
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="flex gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">{post.title}</h2>
            <p className="text-xl text-white mb-4">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <Link href={`/blog/${post.slug}`}>
                <Button variant="default" size="lg">
                  Read Now
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Trending</Badge>
                <span className="text-white text-sm">
                  {post.views.toLocaleString()} views • {post.readingTime} min read
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {posts.length > 1 && (
        <>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {posts.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? "bg-white" : "bg-gray-400"
                }`}
                onClick={() => {
                  setCurrentSlide(index)
                  setIsAutoplay(false)
                }}
              />
            ))}
          </div>
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
            onClick={handlePrev}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
            onClick={handleNext}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  )
}
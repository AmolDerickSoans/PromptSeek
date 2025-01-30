"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const trendingBlogs = [
  {
    id: 1,
    title: "Mastering DeepSeek: Advanced Prompt Engineering Techniques",
    excerpt: "Learn how to craft powerful prompts for DeepSeek AI models.",
    image: "/dummy/hero/privacy.jpeg",
    views: 15000,
    duration: "10 min read",
  },
  {
    id: 2,
    title: "Building Scalable Applications with Claude API",
    excerpt: "Discover best practices for integrating Claude API in your projects.",
    image: "/dummy/hero/thermic.jpeg",
    views: 12000,
    duration: "8 min read",
  },
  {
    id: 3,
    title: "The Future of AI: Trends and Predictions for 2024",
    excerpt: "Explore the cutting-edge developments shaping the AI landscape.",
    image: "/dummy/hero/elementcapital.jpeg",
    views: 18000,
    duration: "12 min read",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)

  useEffect(() => {
    if (isAutoplay) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % trendingBlogs.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoplay])

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + trendingBlogs.length) % trendingBlogs.length)
    setIsAutoplay(false)
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % trendingBlogs.length)
    setIsAutoplay(false)
  }

  return (
    <div className="relative w-full h-[500px] mb-8 overflow-hidden rounded-lg">
      {trendingBlogs.map((blog, index) => (
        <div
          key={blog.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${blog.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <h2 className="text-4xl font-bold text-white mb-2">{blog.title}</h2>
            <p className="text-xl text-white mb-4">{blog.excerpt}</p>
            <div className="flex items-center justify-between">
              <Button variant="default" size="lg">
                Read Now
              </Button>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Trending</Badge>
                <span className="text-white text-sm">
                  {blog.views.toLocaleString()} views • {blog.duration}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {trendingBlogs.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-gray-400"}`}
            onClick={() => {
              setCurrentSlide(index)
              setIsAutoplay(false)
            }}
          />
        ))}
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={handlePrev}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={handleNext}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}


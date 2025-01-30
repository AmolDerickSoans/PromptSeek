"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { Share2, Bookmark, Type, Moon, Sun, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import TableOfContents from "@/components/TableOfContents"
import CommentSection from "@/components/CommentSection"

// Mock data for the blog post
const blogPost = {
  title: "Mastering DeepSeek: Advanced Prompt Engineering Techniques",
  author: "Jane Doe",
  date: "May 28, 2023",
  content: `
    # Introduction

    DeepSeek is a powerful AI model that can be leveraged for various tasks. In this post, we'll explore advanced prompt engineering techniques to get the most out of DeepSeek.

    ## Understanding DeepSeek's Capabilities

    DeepSeek excels in natural language processing tasks, including:

    - Text generation
    - Sentiment analysis
    - Language translation

    ## Key Prompt Engineering Techniques

    ### 1. Be Specific and Detailed

    When crafting prompts for DeepSeek, it's crucial to be as specific and detailed as possible. This helps the model understand exactly what you're looking for.

    ### 2. Use Context Effectively

    Providing relevant context in your prompts can significantly improve the quality of DeepSeek's responses. Here's an example:

    \`\`\`python
    context = "You are an AI assistant specializing in climate science."
    prompt = f"{context} Explain the greenhouse effect in simple terms."
    response = deepseek.generate(prompt)
    print(response)
    \`\`\`

    ### 3. Leverage Few-Shot Learning

    Few-shot learning can help DeepSeek understand the pattern you're looking for. Here's how you might use it:

    \`\`\`python
    few_shot_examples = """
    Input: Convert 10 miles to kilometers
    Output: 10 miles is equal to 16.09 kilometers

    Input: Convert 5 pounds to kilograms
    Output: 5 pounds is equal to 2.27 kilograms
    """

    user_input = "Convert 20 feet to meters"
    prompt = f"{few_shot_examples}\n\nInput: {user_input}\nOutput:"

    response = deepseek.generate(prompt)
    print(response)
    \`\`\`

    ## Conclusion

    Mastering these prompt engineering techniques will allow you to harness the full potential of DeepSeek. Remember to experiment and iterate on your prompts to achieve the best results.
  `,
  tags: ["AI", "DeepSeek", "Prompt Engineering"],
  image: "/dummy/hero/lenscape.jpeg",
}

export default function BlogPostPage() {
  const [progress, setProgress] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [showBackToTop, setShowBackToTop] = useState(false)

  const [heroRef, heroInView] = useInView({
    threshold: 0,
  })

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = scrollTop / docHeight
      setProgress(scrollPercent * 100)
      setShowBackToTop(scrollPercent > 0.5)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 24))
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 12))

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <aside className="hidden md:block md:col-span-2 space-y-4">
            <div className="sticky top-4">
              <div className="h-full w-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-300 ease-out"
                  style={{ height: `${progress}%` }}
                />
              </div>
              <TableOfContents content={blogPost.content} />
              <div className="mt-4 space-y-2">
                <Button variant="outline" size="icon" onClick={() => {}}>
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={decreaseFontSize}>
                  <Type className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={increaseFontSize}>
                  <Type className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" onClick={toggleDarkMode}>
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-8">
            <article className="prose lg:prose-xl dark:prose-invert mx-auto" style={{ fontSize: `${fontSize}px` }}>
              <div ref={heroRef} className="relative h-96 mb-8">
                <Image
                  src={blogPost.image || "/placeholder.svg"}
                  alt={blogPost.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-8 rounded-lg">
                  <h1 className="text-4xl font-bold text-white mb-4">{blogPost.title}</h1>
                </div>
              </div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <Image
                    src="/images/avatar-placeholder.jpg"
                    alt={blogPost.author}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{blogPost.author}</p>
                    <p className="text-sm text-gray-500">{blogPost.date}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {blogPost.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
            </article>

            <Separator className="my-8" />

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Up Next</h3>
                <Link href="#" className="block p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-semibold mb-2">Getting Started with Claude API: A Comprehensive Guide</h4>
                  <p className="text-gray-600">Learn how to integrate Claude API into your projects efficiently.</p>
                </Link>
              </div>

              <CommentSection />
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-4 space-y-4">
              <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
              <div className="flex flex-col space-y-2">
                <Button variant="outline" size="sm">
                  <Image src="/twitter-icon.svg" alt="Twitter" width={16} height={16} className="mr-2" />
                  Twitter
                </Button>
                <Button variant="outline" size="sm">
                  <Image src="/facebook-icon.svg" alt="Facebook" width={16} height={16} className="mr-2" />
                  Facebook
                </Button>
                <Button variant="outline" size="sm">
                  <Image src="/linkedin-icon.svg" alt="LinkedIn" width={16} height={16} className="mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Floating Subscribe CTA */}
      <div
        className={`fixed bottom-4 right-4 transition-opacity duration-300 ${
          showBackToTop ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <ChevronUp className="mr-2 h-4 w-4" /> Back to Top
        </Button>
      </div>

      {/* Floating Subscribe CTA */}
      <div
        className={`fixed bottom-4 left-4 transition-opacity duration-300 ${
          !heroInView ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Button>Subscribe to Our Newsletter</Button>
      </div>
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ListOrdered } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Heading extraction logic
  useEffect(() => {
    const extractedHeadings =
      content.match(/^#{1,3}\s.+$/gm)?.map((heading) => {
        const level = heading.match(/^#+/)?.[0].length || 0
        const text = heading.replace(/^#+\s/, "")
        const id = text.toLowerCase().replace(/\s/g, "-")
        return { id, text, level }
      }) || []

    setHeadings(extractedHeadings)
  }, [content])

  // Intersection Observer for active heading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  return (
    <>
      {/* Mobile Drawer Trigger */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg">
        <Button 
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="w-full justify-between"
        >
          <ListOrdered className="mr-2" /> 
          Table of Contents
          <ChevronDown 
            className={`transition-transform duration-300 ${
              isDrawerOpen ? 'rotate-180' : ''
            }`} 
          />
        </Button>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-x-0 bottom-0 bg-white z-50 rounded-t-xl shadow-2xl p-4 max-h-[70vh] overflow-y-auto">
          <nav className="space-y-2">
            {headings.map(({ id, text, level }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`block text-sm hover:text-primary transition-colors ${
                  activeId === id ? "text-primary font-semibold" : "text-gray-600"
                }`}
                style={{ marginLeft: `${(level - 1) * 12}px` }}
                onClick={() => setIsDrawerOpen(false)}
              >
                {text}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Desktop Table of Contents */}
      <nav className="hidden md:block space-y-2 sticky top-4">
        <h3 className="font-semibold mb-2">Table of Contents</h3>
        {headings.map(({ id, text, level }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`block text-sm hover:text-primary transition-colors ${
              activeId === id ? "text-primary font-semibold" : "text-gray-600"
            }`}
            style={{ marginLeft: `${(level - 1) * 12}px` }}
          >
            {text}
          </a>
        ))}
      </nav>
    </>
  )
}
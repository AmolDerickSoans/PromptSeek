"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])
  const [activeId, setActiveId] = useState<string>("")

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" },
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  return (
    <nav className="space-y-2">
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
  )
}


"use client"

import { useState } from "react"
import { Terminal, Brain, Server, Code } from "lucide-react"

const tracks = [
  {
    id: 1,
    title: "DeepSeek",
    description: "Prompt Engineering",
    icon: Terminal,
    background: "bg-gradient-to-br from-purple-500 to-indigo-600",
  },
  {
    id: 2,
    title: "Claude API",
    description: "Integration Guide",
    icon: Brain,
    background: "bg-gradient-to-br from-blue-500 to-cyan-600",
  },
  {
    id: 3,
    title: "DevOps",
    description: "Best Practices",
    icon: Server,
    background: "bg-gradient-to-br from-green-500 to-teal-600",
  },
  {
    id: 4,
    title: "Web Dev",
    description: "Frontend & Backend",
    icon: Code,
    background: "bg-gradient-to-br from-red-500 to-pink-600",
  },
]

export default function QuickFilterTiles() {
  const [selectedTracks, setSelectedTracks] = useState<number[]>([])

  const toggleTrack = (id: number) => {
    setSelectedTracks((prev) => (prev.includes(id) ? prev.filter((trackId) => trackId !== id) : [...prev, id]))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {tracks.map((track) => {
        const Icon = track.icon
        const isSelected = selectedTracks.includes(track.id)
        return (
          <button
            key={track.id}
            className={`${
              track.background
            } p-6 rounded-lg text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
              isSelected ? "ring-4 ring-white ring-opacity-50" : ""
            }`}
            onClick={() => toggleTrack(track.id)}
          >
            <div className="flex items-center space-x-4">
              <Icon size={32} />
              <div className="text-left">
                <h3 className="text-xl font-bold">{track.title}</h3>
                <p className="text-sm opacity-80">{track.description}</p>
              </div>
            </div>
            {isSelected && (
              <div className="absolute top-2 right-2 bg-white text-black rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}


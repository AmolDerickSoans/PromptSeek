"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const categories = ["AI", "Programming", "DevOps", "Data Science", "Web Development"]
const difficulties = ["Beginner", "Intermediate", "Expert"]
const sortOptions = ["Newest First", "Most Viewed", "Top Rated"]

export default function SearchAndFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [selectedSort, setSelectedSort] = useState(sortOptions[0])
  const [tags, setTags] = useState<string[]>([])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    // Implement debounced search logic here
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleClearAll = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setSelectedDifficulty(null)
    setTags([])
  }

  return (
    <div className="mb-8 space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <X className="text-gray-400" />
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <Select onValueChange={(value) => setSelectedSort(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          {difficulties.map((difficulty) => (
            <Button
              key={difficulty}
              variant={selectedDifficulty === difficulty ? "default" : "outline"}
              onClick={() => setSelectedDifficulty(difficulty)}
            >
              {difficulty}
            </Button>
          ))}
        </div>
      </div>
      {(selectedCategories.length > 0 || selectedDifficulty || tags.length > 0) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium">Active filters:</span>
          {selectedCategories.map((category) => (
            <Badge key={category} variant="secondary" className="cursor-pointer">
              {category}
              <button onClick={() => handleCategoryChange(category)} className="ml-1">
                ×
              </button>
            </Badge>
          ))}
          {selectedDifficulty && (
            <Badge variant="secondary" className="cursor-pointer">
              {selectedDifficulty}
              <button onClick={() => setSelectedDifficulty(null)} className="ml-1">
                ×
              </button>
            </Badge>
          )}
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="cursor-pointer">
              {tag}
              <button onClick={() => setTags((prev) => prev.filter((t) => t !== tag))} className="ml-1">
                ×
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={handleClearAll}>
            Clear All
          </Button>
        </div>
      )}
    </div>
  )
}


import HeroCarousel from "@/components/HeroCarousel"
import QuickFilterTiles from "@/components/QuickFilterTiles"
import SearchAndFilters from "@/components/SearchAndFilters"
import BlogListing from "@/components/BlogListing"

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <HeroCarousel />
      <QuickFilterTiles />
      <SearchAndFilters />
      <BlogListing />
    </div>
  )
}
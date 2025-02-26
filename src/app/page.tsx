import HeroCarousel from "@/components/HeroCarousel"
import QuickFilterTiles from "@/components/QuickFilterTiles"
import SearchAndFilters from "@/components/SearchAndFilters"
import BlogListing from "@/components/BlogListing"
import { heroCarouselQuery } from "@/lib/sanity/queries"
import { client } from "@/lib/sanity/client"
import { MorphingText } from "@/components/magicui/morphing-text"
async function getHeroCarouselPosts() {
  return await client.fetch(heroCarouselQuery)
}
export default async function  Home() {
  const posts = await getHeroCarouselPosts()
  const texts = [
    "Learn Agentic AI",
    "Master AI Agents",
    "AI's Next Stage. Explained",
    "Stay Ahead in AI",
    "Your Agentic AI Guide",
  ];
  return (
    <div>
    <MorphingText texts={texts} />
    <div className="container mx-auto px-4">
       <HeroCarousel posts={posts} />
      <QuickFilterTiles />
      <SearchAndFilters />
      <BlogListing />
    </div>
    </div>
  )
}
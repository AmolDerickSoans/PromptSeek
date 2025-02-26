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
    "Hello",
    "Morphing",
    "Text",
    "Animation",
    "React",
    "Component",
    "Smooth",
    "Transition",
    "Engaging",
  ];
  return (
    <div className="container mx-auto px-4">
      <MorphingText texts={texts} />
       <HeroCarousel posts={posts} />
      <QuickFilterTiles />
      <SearchAndFilters />
      <BlogListing />
    </div>
  )
}
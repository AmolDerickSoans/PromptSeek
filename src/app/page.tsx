import HeroCarousel from "@/components/HeroCarousel"
import QuickFilterTiles from "@/components/QuickFilterTiles"
import SearchAndFilters from "@/components/SearchAndFilters"
import BlogListing from "@/components/BlogListing"
import { heroCarouselQuery , client} from "@/lib/sanity/client"

async function getHeroCarouselPosts() {
  return await client.fetch(heroCarouselQuery)
}
export default async function  Home() {
  const posts = await getHeroCarouselPosts()

  return (
    <div className="container mx-auto px-4">
       <HeroCarousel posts={posts} />
      <QuickFilterTiles />
      <SearchAndFilters />
      <BlogListing />
    </div>
  )
}
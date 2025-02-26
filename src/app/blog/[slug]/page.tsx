"use client"

import { useState, useEffect } from "react"
import { useParams } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { Share2, Bookmark, Type, Moon, Sun, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import TableOfContents from "@/components/TableOfContents"
import { client } from "@/lib/sanity/client"
import { blogContentQuery, recentPostsQuery } from "@/lib/sanity/queries"
import { PortableText } from "@portabletext/react"
import { format } from "date-fns"
import Head from "next/head"

// Default placeholder image URL - adjust the path as needed
const DEFAULT_PLACEHOLDER_IMAGE = "/api/placeholder/800/600"
const DEFAULT_AVATAR_PLACEHOLDER = "/api/placeholder/40/40"

interface Author {
  name: string;
  image?: {
    asset: {
      url: string;
    };
  };
}

interface Post {
  title: string;
  publishedAt: string;
  author: Author;
  mainImage?: {
    asset?: {
      url?: string;
    };
  };
  tags?: Array<{
    title: string;
  }>;
  body: any;
  nextPost?: {
    title: string;
    slug: {
      current: string;
    };
    excerpt: string;
    mainImage?: {
      asset?: {
        url?: string;
      };
    };
  };
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [heroRef, heroInView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await client.fetch(blogContentQuery, { 
          slug: Array.isArray(slug) ? slug[0] : slug 
        });
        setPost(postData);

        const recentPostsData = await client.fetch(recentPostsQuery);
        setRecentPosts(recentPostsData);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const portableTextComponents = {
    types: {
      image: ({ value }: { value: { asset?: { url?: string }, alt?: string } }) => {
        const imageUrl = value?.asset?.url;
        if (!imageUrl) return null;

        return (
          <div className="relative w-full h-96 my-8">
            <Image
              src={imageUrl}
              alt={value.alt || ""}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        );
      },
      codeBlock: ({ value }: { value: { filename: string; code: string } }) => (
        <div className="my-4">
          <p className="text-sm text-gray-500 mb-2">{value.filename}</p>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{value.code}</code>
          </pre>
        </div>
      ),
    },
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  // Helper function to get safe image URL
  const getImageUrl = (imageObj?: { asset?: { url?: string } }) => {
    return imageObj?.asset?.url || null;
  };

  return (
    <>
      <Head>
        <title>{post?.title ? `${post.title} | PromptSeek Blog` : 'PromptSeek Blog'}</title>
        <meta name="description" content={post?.body || 'Read our latest blog post on PromptSeek'} />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={post?.title || 'PromptSeek Blog'} />
        <meta property="og:description" content={post?.title || 'Read our latest blog post on PromptSeek'} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={getImageUrl(post?.mainImage) || DEFAULT_PLACEHOLDER_IMAGE} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post?.title || 'PromptSeek Blog'} />
        <meta name="twitter:description" content={post?.title || 'Read our latest blog post on PromptSeek'} />
        <meta name="twitter:image" content={getImageUrl(post?.mainImage) || DEFAULT_PLACEHOLDER_IMAGE} />
        
        {/* Additional metadata */}
        <meta name="author" content={post?.author?.name || 'PromptSeek'} />
        {post?.publishedAt && <meta name="date" content={new Date(post.publishedAt).toISOString()} />}
      </Head>
      <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <main className="md:col-span-8 lg:col-span-9">
              <article className="prose lg:prose-xl dark:prose-invert font-sans antialiased [&>p]:mb-6 [&>p]:mt-2" 
                style={{ fontSize: `${fontSize}px`, fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                <div ref={heroRef} className="relative h-96 mb-8">
                  <Image
                    src={getImageUrl(post.mainImage) || DEFAULT_PLACEHOLDER_IMAGE}
                    alt={post.title}
                    fill
                    className="rounded-lg object-cover"
                    priority
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={true}
                    loader={({ src }) => {
                      // Add cache key to URL to enable browser caching
                      const url = new URL(src);
                      url.searchParams.set('cache', 'true');
                      return url.toString();
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-8 rounded-lg">
                    <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={getImageUrl(post.author?.image) || DEFAULT_AVATAR_PLACEHOLDER}
                      alt={post.author?.name || "Author"}
                      width={40}
                      height={40}
                      className="rounded-full"
                      loading="lazy"
                      sizes="40px"
                    />
                    <div>
                      <p className="font-semibold">{post.author?.name}</p>
                      <p className="text-sm text-gray-500">
                        {post.publishedAt ? format(new Date(post.publishedAt), 'MMMM dd, yyyy') : 'Publication date not available'}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {post.tags?.map((tag) => (
                      <Badge key={tag.title} variant="secondary">
                        {tag.title}
                      </Badge>
                    ))}
                  </div>
                </div>

                <PortableText 
                  value={post.body}
                  components={portableTextComponents}
                />
              </article>

              {post.nextPost && (
                <div className="mt-8 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Up Next</h2>
                  <Link 
                    href={`/blog/${post.nextPost.slug.current}`} 
                    className="block hover:opacity-80 transition-opacity"
                  >
                    <h3 className="text-lg font-medium mb-2">{post.nextPost.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{post.nextPost.excerpt}</p>
                  </Link>
                </div>
              )}
            </main>

            <aside className="md:col-span-4 lg:col-span-3 space-y-8 sticky top-24">
            </aside>
          </div>
        </div>

      {showBackToTop && (
        <Button
          className="fixed bottom-4 right-4"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ChevronUp className="mr-2 h-4 w-4" /> Back to Top
        </Button>
      )}
    </div>

    </>
  );
}
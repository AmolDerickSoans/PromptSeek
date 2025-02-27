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
import { client, urlFor } from "@/lib/sanity/client"
import { blogContentQuery, recentPostsQuery } from "@/lib/sanity/queries"
import { PortableText } from "@portabletext/react"
import { format } from "date-fns"
import Head from "next/head"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-json'
import BlogSkeleton from "@/components/BlogSkeleton"

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

  // Initialize Prism.js after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, [post]);

  const portableTextComponents = {
    types: {
      image: ({ value }: { value: any }) => {
        if (!value?.asset?._ref) return null;

        return (
          <div className="relative w-full h-96 my-8">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || ""}
              fill
              className="rounded-lg object-cover"
              priority
              loading="eager"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        );
      },

      codeBlock: ({ value }: { value: { filename: string; code: string; language?: string } }) => {
        interface CodeBlockProps {
          filename: string;
          code: string;
          language?: string;
        }

        const CodeBlockComponent: React.FC<CodeBlockProps> = ({ filename, code, language }) => {
          useEffect(() => {
            if (typeof window !== 'undefined') {
              Prism.highlightAll();
            }
          }, []);

          return (
            <div className="my-4">
              {filename && (
                <div className="flex justify-between items-center bg-gray-800 dark:bg-gray-900 px-4 py-2 rounded-t-lg">
                  <p className="text-sm text-gray-300">{filename}</p>
                </div>
              )}
              <pre className={`${isDarkMode ? 'dark:bg-gray-900' : 'bg-gray-100'} p-4 ${filename ? 'rounded-b-lg' : 'rounded-lg'} overflow-x-auto`}>
                <code className={`language-${language || 'javascript'}`}>
                  {code}
                </code>
              </pre>
            </div>
          );
        };

        return <CodeBlockComponent filename={value.filename} code={value.code} language={value.language} />;

      },
    },
  };

  if (!post) {
    return <div>
      <BlogSkeleton/>
    </div>;
  }

  // Helper function to get safe image URL using Sanity's urlFor
  const getImageUrl = (imageObj?: any) => {
    return imageObj ? urlFor(imageObj).url() : null;
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
              <article className="font-sans antialiased max-w-none text-gray-900 dark:text-gray-100">
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

                <div className="blog-content space-y-6">
                  <PortableText 
                    value={post.body}
                    components={{
                      ...portableTextComponents,
                      block: {
                        h1: ({children}) => <h1 className="text-4xl font-bold tracking-tight mb-4">{children}</h1>,
                        h2: ({children}) => <h2 className="text-3xl font-bold tracking-tight mb-4">{children}</h2>,
                        h3: ({children}) => <h3 className="text-2xl font-semibold mb-3">{children}</h3>,
                        h4: ({children}) => <h4 className="text-xl font-semibold mb-3">{children}</h4>,
                        h5: ({children}) => <h5 className="text-lg font-medium mb-2">{children}</h5>,
                        h6: ({children}) => <h6 className="text-base font-medium mb-2">{children}</h6>,
                        normal: ({children}) => <p className="text-base leading-relaxed mb-4">{children}</p>,
                        blockquote: ({children}) => (
                          <blockquote className="border-l-4 border-primary pl-4 italic my-4">{children}</blockquote>
                        ),
                      },
                      marks: {
                        link: ({children, value}) => (
                          <a href={value.href} className="text-primary hover:underline">{children}</a>
                        ),
                        code: ({children}) => (
                          <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">{children}</code>
                        ),
                      },
                      list: {
                        bullet: ({children}) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
                        number: ({children}) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
                      },
                    }}
                  />
                </div>
              </article>

              {post.nextPost && post.nextPost.slug && (
                <div className="mt-8 bg-gray-50 dark:bg-zinc-900 p-6 rounded-lg shadow-sm">
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
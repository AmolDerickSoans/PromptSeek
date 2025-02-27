"use client"

export default function BlogSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <main className="md:col-span-8 lg:col-span-9">
          <article className="font-sans antialiased">
            {/* Hero Image Skeleton */}
            <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800">
                <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-white/20 to-transparent" />
              </div>
            </div>

            {/* Author and Tags Skeleton */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative">
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-white/20 to-transparent" />
                </div>
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-zinc-100 dark:bg-zinc-800 rounded relative overflow-hidden">
                    <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-white/20 to-transparent" />
                  </div>
                  <div className="w-24 h-3 bg-zinc-100 dark:bg-zinc-800 rounded relative overflow-hidden">
                    <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-white/20 to-transparent" />
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="w-16 h-6 bg-zinc-100 dark:bg-zinc-800 rounded-full relative overflow-hidden">
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-white/20 to-transparent" />
                </div>
                <div className="w-16 h-6 bg-zinc-100 dark:bg-zinc-800 rounded-full relative overflow-hidden">
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-white/20 to-transparent" />
                </div>
              </div>
            </div>

            {/* Content Paragraphs Skeleton */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="w-3/4 h-4 bg-zinc-100 dark:bg-zinc-800 rounded relative overflow-hidden">
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-white/20 to-transparent" />
                </div>
                <div className="w-full h-4 bg-zinc-100 dark:bg-zinc-800 rounded relative overflow-hidden">
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-white/20 to-transparent" />
                </div>
                <div className="w-5/6 h-4 bg-zinc-100 dark:bg-zinc-800 rounded relative overflow-hidden">
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-white/20 to-transparent" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-full h-4 bg-zinc-100 dark:bg-zinc-800 rounded relative overflow-hidden">
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-white/20 to-transparent" />
                </div>
                <div className="w-4/5 h-4 bg-zinc-100 dark:bg-zinc-800 rounded relative overflow-hidden">
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-white/20 to-transparent" />
                </div>
                <div className="w-5/6 h-4 bg-zinc-100 dark:bg-zinc-800 rounded relative overflow-hidden">
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-white/20 to-transparent" />
                </div>
              </div>
            </div>
          </article>
        </main>

        <aside className="md:col-span-4 lg:col-span-3 space-y-8 sticky top-24">
          {/* Sidebar Skeleton */}
          <div className="space-y-4">
            <div className="w-full h-4 bg-zinc-100 dark:bg-zinc-800 rounded relative overflow-hidden">
              <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-white/20 to-transparent" />
            </div>
            <div className="w-4/5 h-4 bg-zinc-100 dark:bg-zinc-800 rounded relative overflow-hidden">
              <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-white/20 to-transparent" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
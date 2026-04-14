/**
 * NewsCardSkeleton — animated shimmer placeholder
 * Shown while the news feed is loading, matching the exact NewsCard layout.
 */
export default function NewsCardSkeleton({ index = 0 }) {
  return (
    <div
      className="card flex flex-col h-full"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Thumbnail placeholder */}
      <div className="h-48 bg-gradient-to-r from-forest-100 via-forest-50 to-forest-100
                      animate-pulse shrink-0" />

      <div className="flex flex-col flex-1 p-5 space-y-3">
        {/* Meta row */}
        <div className="flex gap-3">
          <div className="h-3 bg-forest-100 rounded-full w-20 animate-pulse" />
          <div className="h-3 bg-forest-100 rounded-full w-28 animate-pulse" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 bg-forest-100 rounded w-full animate-pulse" />
          <div className="h-4 bg-forest-100 rounded w-5/6 animate-pulse" />
          <div className="h-4 bg-forest-100 rounded w-3/4 animate-pulse" />
        </div>

        {/* Excerpt */}
        <div className="space-y-1.5">
          <div className="h-3 bg-forest-50 rounded w-full animate-pulse" />
          <div className="h-3 bg-forest-50 rounded w-full animate-pulse" />
          <div className="h-3 bg-forest-50 rounded w-2/3 animate-pulse" />
        </div>

        {/* Tags */}
        <div className="flex gap-2">
          <div className="h-5 bg-forest-50 rounded-full w-16 animate-pulse" />
          <div className="h-5 bg-forest-50 rounded-full w-20 animate-pulse" />
        </div>

        {/* Buttons */}
        <div className="mt-auto pt-3 border-t border-forest-50 flex gap-2">
          <div className="flex-1 h-8 bg-forest-100 rounded-xl animate-pulse" />
          <div className="flex-1 h-8 bg-forest-100 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  )
}

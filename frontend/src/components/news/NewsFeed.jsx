import NewsCard from './NewsCard'
import NewsCardSkeleton from './NewsCardSkeleton'
import ErrorMessage from '@components/common/ErrorMessage'
import EmptyState from '@components/common/EmptyState'
import { Search } from 'lucide-react'

/**
 * NewsFeed
 * Props:
 *   articles  {Array}    – article objects from Guardian
 *   loading   {boolean}
 *   error     {string|null}
 *   onRetry   {function}
 */
export default function NewsFeed({ articles, loading, error, onRetry }) {
  // ── Loading state — 12 skeletons ──────────────────────────────────────────
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <NewsCardSkeleton key={i} index={i} />
        ))}
      </div>
    )
  }

  // ── Error state ───────────────────────────────────────────────────────────
  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={onRetry}
      />
    )
  }

  // ── Empty state ───────────────────────────────────────────────────────────
  if (!articles || articles.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title="No articles found"
        message="Try adjusting your search query or changing the category filter."
      />
    )
  }

  // ── Feed grid ─────────────────────────────────────────────────────────────
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, i) => (
        <NewsCard key={article.id} article={article} index={i} />
      ))}
    </div>
  )
}

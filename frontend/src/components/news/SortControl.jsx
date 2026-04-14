import { ArrowUpDown, Clock, History, Star } from 'lucide-react'
import useNewsStore from '@store/newsStore'

const SORT_OPTIONS = [
  { value: 'newest',   label: 'Latest First',  icon: Clock   },
  { value: 'oldest',   label: 'Oldest First',  icon: History },
  { value: 'relevance',label: 'Most Relevant', icon: Star    },
]

/**
 * SortControl — compact dropdown for article sort order
 */
export default function SortControl() {
  const { sortOrder, setSortOrder } = useNewsStore()
  const current = SORT_OPTIONS.find((o) => o.value === sortOrder) || SORT_OPTIONS[0]

  return (
    <div className="relative flex items-center gap-1.5">
      <ArrowUpDown size={13} className="text-forest-400 shrink-0" />
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="text-xs font-medium text-forest-700 bg-white border border-forest-200
                   rounded-xl px-3 py-1.5 pr-7 appearance-none cursor-pointer
                   hover:border-forest-400 focus:outline-none focus:ring-2
                   focus:ring-forest-400 focus:ring-offset-1 transition-colors"
        aria-label="Sort articles by"
      >
        {SORT_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      {/* Custom chevron */}
      <svg
        className="absolute right-2 pointer-events-none text-forest-400"
        width="10" height="10" viewBox="0 0 10 10"
      >
        <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5"
              fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

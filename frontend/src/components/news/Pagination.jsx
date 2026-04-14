import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Pagination
 * Props:
 *   currentPage  {number}
 *   totalPages   {number}
 *   onPageChange {function}
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null

  // Build page window: always show first, last, current ± 2
  const pages = buildPageWindow(currentPage, totalPages)

  function handlePage(p) {
    if (p < 1 || p > totalPages || p === currentPage) return
    onPageChange(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav
      className="flex items-center justify-center gap-1 mt-10 flex-wrap"
      aria-label="News pagination"
    >
      {/* Prev */}
      <button
        onClick={() => handlePage(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-xl flex items-center justify-center
                   text-forest-600 hover:bg-forest-100 disabled:opacity-30
                   disabled:cursor-not-allowed transition-all duration-150"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === '…' ? (
          <span
            key={`ellipsis-${i}`}
            className="w-9 h-9 flex items-center justify-center text-forest-400 text-sm"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => handlePage(p)}
            aria-current={p === currentPage ? 'page' : undefined}
            className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-150
              ${p === currentPage
                ? 'bg-forest-700 text-white shadow-sm'
                : 'text-forest-700 hover:bg-forest-100'
              }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => handlePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 rounded-xl flex items-center justify-center
                   text-forest-600 hover:bg-forest-100 disabled:opacity-30
                   disabled:cursor-not-allowed transition-all duration-150"
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  )
}

// ── Helper ────────────────────────────────────────────────────────────────────

function buildPageWindow(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages = new Set([1, total, current])
  for (let d = 1; d <= 2; d++) {
    if (current - d >= 1)     pages.add(current - d)
    if (current + d <= total) pages.add(current + d)
  }

  const sorted  = Array.from(pages).sort((a, b) => a - b)
  const result  = []
  let   prev    = 0

  for (const p of sorted) {
    if (p - prev > 1) result.push('…')
    result.push(p)
    prev = p
  }

  return result
}

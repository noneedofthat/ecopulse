import { useState } from 'react'
import { ExternalLink, Clock, User, Tag, BookOpen, Sparkles } from 'lucide-react'
import { timeAgo, truncate } from '@utils/helpers'
import SummaryModal from './SummaryModal'

// Section → colour accent mapping
const SECTION_ACCENTS = {
  'environment':          { bg: 'bg-forest-100',  text: 'text-forest-800',  dot: 'bg-forest-500'  },
  'science':              { bg: 'bg-blue-50',      text: 'text-blue-700',    dot: 'bg-blue-400'    },
  'sustainable-business': { bg: 'bg-bark-100',     text: 'text-bark-700',    dot: 'bg-bark-500'    },
  'global-development':   { bg: 'bg-earth-100',    text: 'text-earth-700',   dot: 'bg-earth-500'   },
  'cities':               { bg: 'bg-forest-50',    text: 'text-forest-700',  dot: 'bg-forest-400'  },
  'world':                { bg: 'bg-amber-100',    text: 'text-amber-600',   dot: 'bg-amber-500'   },
}
const DEFAULT_ACCENT = { bg: 'bg-forest-100', text: 'text-forest-800', dot: 'bg-forest-500' }

// Placeholder gradient when no thumbnail is available
const PLACEHOLDER_GRADIENTS = [
  'from-forest-800 to-forest-600',
  'from-forest-900 to-forest-700',
  'from-earth-700  to-forest-800',
  'from-bark-700   to-forest-700',
  'from-forest-700 to-bark-500',
]

function getPlaceholderGradient(id) {
  const hash = id ? id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) : 0
  return PLACEHOLDER_GRADIENTS[hash % PLACEHOLDER_GRADIENTS.length]
}

export default function NewsCard({ article, index = 0 }) {
  const [imgError, setImgError] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const accent  = SECTION_ACCENTS[article.section] || DEFAULT_ACCENT
  const gradient = getPlaceholderGradient(article.id)

  return (
    <article
      className="card group flex flex-col h-full animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* ── Thumbnail ─────────────────────────────────── */}
      <div className="relative overflow-hidden h-48 shrink-0">
        {article.thumbnail && !imgError ? (
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500
                       group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          /* Illustrated placeholder with leaf pattern */
          <div className={`w-full h-full bg-gradient-to-br ${gradient}
                           flex items-center justify-center relative overflow-hidden`}>
            {/* Decorative leaf SVG */}
            <svg
              viewBox="0 0 120 120"
              className="w-20 h-20 opacity-20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M60 10 Q88 30 88 60 Q88 95 60 110 Q32 95 32 60 Q32 30 60 10Z"
                fill="white"
              />
              <line x1="60" y1="10" x2="60" y2="110" stroke="white" strokeWidth="2" opacity="0.6"/>
              <line x1="60" y1="50" x2="80" y2="44" stroke="white" strokeWidth="1.5" opacity="0.5"/>
              <line x1="60" y1="65" x2="42" y2="59" stroke="white" strokeWidth="1.5" opacity="0.5"/>
              <line x1="60" y1="80" x2="78" y2="75" stroke="white" strokeWidth="1.5" opacity="0.5"/>
            </svg>
          </div>
        )}

        {/* Section badge — overlaid on image */}
        <div className="absolute top-3 left-3">
          <span className={`badge ${accent.bg} ${accent.text} shadow-sm text-xs font-semibold`}>
            <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} mr-1.5`} />
            {article.sectionLabel || article.section}
          </span>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5">

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-forest-400 mb-3">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {timeAgo(article.date)}
          </span>
          {article.byline && (
            <span className="flex items-center gap-1 truncate max-w-[140px]">
              <User size={11} />
              {article.byline}
            </span>
          )}
          {article.wordcount > 0 && (
            <span className="flex items-center gap-1 ml-auto shrink-0">
              <BookOpen size={11} />
              {Math.round(article.wordcount / 200)} min
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-forest-900 text-base leading-snug mb-2
                       group-hover:text-forest-700 transition-colors duration-200 line-clamp-3">
          {article.title}
        </h3>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-forest-600 text-sm leading-relaxed line-clamp-3 mb-4">
            {truncate(article.excerpt, 160)}
          </p>
        )}

        {/* Tags */}
        {article.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs bg-forest-50
                           text-forest-600 px-2 py-0.5 rounded-full border border-forest-100"
              >
                <Tag size={9} />
                {truncate(tag, 24)}
              </span>
            ))}
          </div>
        )}

        {/* ── Action row ──────────────────────────────── */}
        <div className="mt-auto flex items-center gap-2 pt-3 border-t border-forest-50">
          {/* AI Summary button */}
          <button
            onClick={() => setShowSummary(true)}
            className="flex-1 btn-secondary text-xs py-2 gap-1.5 justify-center
                       hover:bg-forest-200 active:bg-forest-300"
            aria-label={`Get AI summary of: ${article.title}`}
          >
            <Sparkles size={13} />
            AI Summary
          </button>

          {/* Read full article */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 btn-primary text-xs py-2 gap-1.5 justify-center"
            aria-label={`Read: ${article.title}`}
          >
            Read
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* ── Summary Modal ────────────────────────────── */}
      {showSummary && (
        <SummaryModal 
          article={article} 
          onClose={() => setShowSummary(false)} 
        />
      )}
    </article>
  )
}

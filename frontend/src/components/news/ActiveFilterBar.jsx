import { X, SlidersHorizontal, Leaf, Microscope, Recycle, HandHeart, MapPin, Flag, ArrowUp, Star } from 'lucide-react'
import useNewsStore from '@store/newsStore'

const SECTION_CONFIG = {
  'environment':          { label: 'Environment',      icon: Leaf },
  'science':              { label: 'Science',          icon: Microscope },
  'sustainable-business': { label: 'Sustainable Biz',  icon: Recycle },
  'global-development':   { label: 'Global Dev',       icon: HandHeart },
}

const SORT_CONFIG = {
  'oldest':    { label: 'Oldest First',    icon: ArrowUp },
  'relevance': { label: 'Most Relevant',   icon: Star },
}

/**
 * ActiveFilterBar
 *
 * Shows dismissible chips for every non-default active filter.
 * Hidden entirely when all filters are at default values.
 */
export default function ActiveFilterBar() {
  const {
    selectedSection,
    sortOrder,
    locationMode,
    customLocation,
    totalResults,
    loading,
    setSelectedSection,
    setSortOrder,
    setLocationMode,
    resetFilters,
    activeFilterCount,
  } = useNewsStore()

  const count = activeFilterCount()
  const chips = []

  if (selectedSection !== 'all') {
    const config = SECTION_CONFIG[selectedSection]
    chips.push({
      key:     'section',
      label:   config?.label || selectedSection,
      icon:    config?.icon,
      onRemove: () => setSelectedSection('all'),
    })
  }

  if (sortOrder !== 'newest') {
    const config = SORT_CONFIG[sortOrder]
    chips.push({
      key:     'sort',
      label:   config?.label || sortOrder,
      icon:    config?.icon,
      onRemove: () => setSortOrder('newest'),
    })
  }

  if (locationMode === 'india') {
    chips.push({
      key:     'location-india',
      label:   'India',
      icon:    Flag,
      onRemove: () => setLocationMode('global'),
    })
  }

  if (locationMode === 'custom' && customLocation) {
    chips.push({
      key:     'location-custom',
      label:   customLocation,
      icon:    MapPin,
      onRemove: () => setLocationMode('global'),
    })
  }

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 py-3 px-4 bg-forest-50
                    rounded-xl border border-forest-100 mb-4 animate-fade-in">

      {/* Filters label */}
      <span className="flex items-center gap-1.5 text-xs font-semibold text-forest-600 mr-1">
        <SlidersHorizontal size={12} />
        {count} filter{count > 1 ? 's' : ''} active
      </span>

      {/* Result count */}
      {!loading && totalResults > 0 && (
        <span className="text-xs text-forest-400 mr-1">
          · {totalResults.toLocaleString()} results
        </span>
      )}

      {/* Chips */}
      {chips.map(({ key, label, icon: Icon, onRemove }) => (
        <span
          key={key}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                     bg-forest-700 text-white text-xs font-medium"
        >
          {Icon && <Icon size={11} />}
          {label}
          <button
            onClick={onRemove}
            className="hover:bg-forest-600 rounded-full p-0.5 transition-colors"
            aria-label={`Remove ${label} filter`}
          >
            <X size={10} />
          </button>
        </span>
      ))}

      {/* Clear all */}
      {chips.length > 1 && (
        <button
          onClick={resetFilters}
          className="text-xs text-forest-500 hover:text-forest-800 underline
                     underline-offset-2 transition-colors ml-1"
        >
          Clear all
        </button>
      )}
    </div>
  )
}

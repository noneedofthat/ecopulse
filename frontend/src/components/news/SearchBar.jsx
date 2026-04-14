import { useState, useRef, useEffect, useCallback } from 'react'
import { Search, X, MapPin, Loader2 } from 'lucide-react'
import useNewsStore from '@store/newsStore'
import { fetchSuggestions } from '@utils/newsService'

/**
 * SearchBar  (Increment 3 upgrade)
 *
 * Features:
 *  - Debounced search (500 ms)
 *  - Autocomplete dropdown from Guardian tag API
 *  - Auto-detects location queries (alphabetic only)
 *  - Location hint pill shown below input
 *  - Clear button
 *  - Keyboard navigation for dropdown (↑ ↓ Enter Escape)
 */
export default function SearchBar() {
  const { searchQuery, locationMode, setSearchQuery, setLocationMode } = useNewsStore()

  const [localValue,    setLocalValue]    = useState(searchQuery)
  const [suggestions,   setSuggestions]   = useState([])
  const [showDropdown,  setShowDropdown]  = useState(false)
  const [loadingSugg,   setLoadingSugg]   = useState(false)
  const [highlightIdx,  setHighlightIdx]  = useState(-1)

  const debounceRef   = useRef(null)
  const suggDebounce  = useRef(null)
  const inputRef      = useRef(null)
  const dropdownRef   = useRef(null)

  // Sync if store is reset externally
  useEffect(() => {
    if (searchQuery === '' && localValue !== '') setLocalValue('')
  }, [searchQuery])

  // Close dropdown on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  // Heuristic: purely alphabetic → likely a place name
  const looksLikeLocation = localValue.trim().length > 1 &&
    /^[a-zA-Z\s,.-]+$/.test(localValue.trim())

  // ── Handlers ────────────────────────────────────────────────────────────
  function handleChange(e) {
    const val = e.target.value
    setLocalValue(val)
    setHighlightIdx(-1)

    // Debounce store update
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setSearchQuery(val.trim())
    }, 500)

    // Debounce suggestions fetch (don't fire for location-like queries)
    clearTimeout(suggDebounce.current)
    if (val.trim().length >= 2 && !looksLikeLocation) {
      setLoadingSugg(true)
      suggDebounce.current = setTimeout(async () => {
        try {
          const results = await fetchSuggestions(val.trim())
          setSuggestions(results)
          setShowDropdown(results.length > 0)
        } catch (_) {
          setSuggestions([])
        } finally {
          setLoadingSugg(false)
        }
      }, 400)
    } else {
      setSuggestions([])
      setShowDropdown(false)
      setLoadingSugg(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    clearTimeout(debounceRef.current)
    clearTimeout(suggDebounce.current)
    setShowDropdown(false)
    setSearchQuery(localValue.trim())
  }

  function handleClear() {
    setLocalValue('')
    setSuggestions([])
    setShowDropdown(false)
    setSearchQuery('')
    setLocationMode('global')
    inputRef.current?.focus()
  }

  function handleSelectSuggestion(suggestion) {
    setLocalValue(suggestion.label)
    setSearchQuery(suggestion.label)
    setShowDropdown(false)
    setSuggestions([])
  }

  // Keyboard navigation
  function handleKeyDown(e) {
    if (!showDropdown || suggestions.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIdx((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIdx((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Enter' && highlightIdx >= 0) {
      e.preventDefault()
      handleSelectSuggestion(suggestions[highlightIdx])
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  return (
    <div className="w-full max-w-2xl" ref={dropdownRef}>
      <form onSubmit={handleSubmit} role="search" aria-label="Search environmental news">
        <div className="relative flex items-center">

          {/* Leading icon */}
          <span className="absolute left-3.5 text-forest-400 pointer-events-none z-10">
            {loadingSugg
              ? <Loader2 size={16} className="animate-spin text-forest-500" />
              : looksLikeLocation
                ? <MapPin size={16} className="text-forest-500" />
                : <Search size={16} />
            }
          </span>

          <input
            ref={inputRef}
            type="search"
            value={localValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
            placeholder='Search topics or locations (e.g. "deforestation", "Pune", "India")…'
            className="input-base pl-10 pr-24 py-3 text-sm w-full"
            aria-label="Search news"
            aria-autocomplete="list"
            aria-expanded={showDropdown}
            autoComplete="off"
            spellCheck="false"
          />

          {/* Clear */}
          {localValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-[72px] text-forest-400 hover:text-forest-700
                         transition-colors p-1 z-10"
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="absolute right-2 btn-primary text-xs px-3 py-1.5 rounded-lg"
          >
            Search
          </button>
        </div>

        {/* Location detection hint */}
        {looksLikeLocation && localValue.trim().length > 1 && (
          <p className="text-xs text-forest-600 mt-1.5 ml-1 flex items-center gap-1.5">
            <MapPin size={11} className="text-forest-500" />
            Filtering news from
            <strong className="text-forest-700">{localValue.trim()}</strong>
            <span className="text-forest-400">· sorted latest to oldest</span>
          </p>
        )}
      </form>

      {/* ── Autocomplete Dropdown ─────────────────────────────────── */}
      {showDropdown && suggestions.length > 0 && (
        <div
          className="absolute z-50 mt-1 w-full max-w-2xl bg-white rounded-xl
                     shadow-card-hover border border-forest-100 overflow-hidden
                     animate-slide-down"
          role="listbox"
          aria-label="Search suggestions"
        >
          {suggestions.map((s, i) => (
            <button
              key={s.id}
              role="option"
              aria-selected={i === highlightIdx}
              onClick={() => handleSelectSuggestion(s)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left
                          transition-colors duration-100
                          ${i === highlightIdx
                            ? 'bg-forest-100 text-forest-900'
                            : 'hover:bg-forest-50 text-forest-700'
                          }`}
            >
              <Search size={13} className="text-forest-400 shrink-0" />
              <span className="truncate">{s.label}</span>
              <span className="ml-auto text-xs text-forest-400 shrink-0 capitalize">
                {s.type}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

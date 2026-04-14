import { create } from 'zustand'

/**
 * News Store — search, filter, sort, location, and pagination state
 *
 * locationMode: 'global' | 'india' | 'custom'
 *   global  → no location filter (worldwide)
 *   india   → locked to India news
 *   custom  → user typed a city/region into SearchBar
 */
const useNewsStore = create((set, get) => ({
  // Filter state
  searchQuery:     '',
  selectedSection: 'all',
  sortOrder:       'newest',      // newest | oldest | relevance
  locationMode:    'global',      // 'global' | 'india' | 'custom'
  customLocation:  '',            // only used when locationMode === 'custom'

  // Data state
  currentPage:     1,
  totalPages:      1,
  totalResults:    0,
  articles:        [],
  loading:         false,
  error:           null,

  // ── Setters ──────────────────────────────────────────────────────────────
  setSearchQuery: (q) => {
    const trimmed = q.trim()
    // If the query is purely alphabetic (a place name), auto-switch to custom location
    const looksLikePlace = trimmed.length > 0 && /^[a-zA-Z\s,.-]+$/.test(trimmed)
    set({
      searchQuery:    trimmed,
      currentPage:    1,
      locationMode:   looksLikePlace ? 'custom' : 'global',
      customLocation: looksLikePlace ? trimmed : '',
    })
  },

  setSelectedSection: (s) => set({ selectedSection: s, currentPage: 1 }),
  setSortOrder:       (o) => set({ sortOrder: o,       currentPage: 1 }),

  setLocationMode: (m) => set((state) => ({
    locationMode:    m,
    customLocation:  m !== 'custom' ? '' : state.customLocation,
    searchQuery:     m !== 'custom' ? '' : state.searchQuery,
    currentPage:     1,
  })),

  setCurrentPage:  (p) => set({ currentPage: p }),

  setArticles: (a, t, total) => set({
    articles:     a,
    totalPages:   t     ?? 1,
    totalResults: total ?? 0,
  }),

  setLoading: (v) => set({ loading: v }),
  setError:   (e) => set({ error: e }),

  // Count active non-default filters (badge on filter toolbar)
  activeFilterCount: () => {
    const s = get()
    let count = 0
    if (s.selectedSection !== 'all')    count++
    if (s.sortOrder       !== 'newest') count++
    if (s.locationMode    !== 'global') count++
    return count
  },

  resetFilters: () => set({
    searchQuery:     '',
    selectedSection: 'all',
    sortOrder:       'newest',
    locationMode:    'global',
    customLocation:  '',
    currentPage:     1,
    error:           null,
  }),
}))

export default useNewsStore

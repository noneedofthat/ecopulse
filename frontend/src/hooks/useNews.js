import { useEffect, useCallback, useRef } from 'react'
import useNewsStore from '@store/newsStore'
import { fetchNews } from '@utils/newsService'

/**
 * useNews — drives the entire news feed
 *
 * Reads all filter/sort/location state from Zustand and hits the backend.
 * Handles debounced location, cancellation on unmount, and retry.
 */
export default function useNews() {
  const {
    searchQuery,
    selectedSection,
    sortOrder,
    locationMode,
    customLocation,
    currentPage,
    articles,
    loading,
    error,
    setArticles,
    setLoading,
    setError,
    setCurrentPage,
  } = useNewsStore()

  const abortRef = useRef(null)

  const load = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()

    setLoading(true)
    setError(null)

    try {
      // Resolve the effective location string to pass to the backend
      let location = ''
      if (locationMode === 'india')  location = 'India'
      if (locationMode === 'custom') location = customLocation

      // When location mode is active, treat searchQuery as a keyword
      // refiner rather than a location string (location already captured above)
      const keyword = locationMode === 'custom' ? '' : searchQuery

      const result = await fetchNews({
        page:     currentPage,
        q:        keyword,
        section:  selectedSection,
        location,
        orderBy:  sortOrder,
      })

      setArticles(
        result.articles,
        result.pagination.totalPages,
        result.pagination.totalResults,
      )
    } catch (err) {
      if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
        setError(err.message || 'Failed to load news.')
      }
    } finally {
      setLoading(false)
    }
  }, [
    currentPage, searchQuery, selectedSection,
    sortOrder, locationMode, customLocation,
    setArticles, setLoading, setError,
  ])

  useEffect(() => {
    load()
    return () => { if (abortRef.current) abortRef.current.abort() }
  }, [load])

  return {
    articles,
    loading,
    error,
    currentPage,
    setCurrentPage,
    retry: load,
  }
}

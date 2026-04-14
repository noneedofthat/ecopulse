import apiClient from '@utils/apiClient'

/**
 * Fetch paginated, filtered, sorted news feed
 */
export async function fetchNews({
  page     = 1,
  q        = '',
  section  = 'all',
  location = '',
  orderBy  = 'newest',
} = {}) {
  const { data } = await apiClient.get('/news', {
    params: { page, q, section, location, orderBy },
  })
  return data  // { articles, pagination }
}

/**
 * Autocomplete suggestions from the Guardian tag API
 */
export async function fetchSuggestions(q) {
  if (!q || q.length < 2) return []
  const { data } = await apiClient.get('/news/suggestions', { params: { q } })
  return data.suggestions || []
}

/**
 * Fetch single article full body (used by AI summary in Increment 4)
 */
export async function fetchArticleById(id) {
  const { data } = await apiClient.get(`/news/${id}`)
  return data
}

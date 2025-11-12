import { useState, useEffect, useCallback } from 'react';
import { fetchArticles } from '../services/newsService';

/**
 * Custom hook to fetch and manage news articles
 * @param {string} category - News category (default: 'all')
 * @param {number} pageSize - Number of articles per page (default: 20)
 * @returns {Object} News state and functions
 */
export function useNews(category = 'all', pageSize = 20) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  // Fetch articles function
  const fetchNews = useCallback(async (pageNum, shouldAppend = false) => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchArticles(category, pageNum, pageSize);

      if (shouldAppend) {
        setArticles((prev) => [...prev, ...data.articles]);
      } else {
        setArticles(data.articles);
      }

      setTotalResults(data.totalResults);
      
      // Check if there are more articles to load
      const totalPages = Math.ceil(data.totalResults / pageSize);
      setHasMore(pageNum < totalPages);
    } catch (err) {
      setError(err.message || 'Failed to fetch articles');
      console.error('Error in useNews:', err);
    } finally {
      setLoading(false);
    }
  }, [category, pageSize]);

  // Load more articles (pagination)
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchNews(nextPage, true);
    }
  }, [loading, hasMore, page, fetchNews]);

  // Fetch articles when category changes
  useEffect(() => {
    setPage(1);
    setArticles([]);
    setHasMore(true);
    fetchNews(1, false);
  }, [category, fetchNews]);

  return {
    articles,
    loading,
    error,
    loadMore,
    hasMore,
    totalResults,
  };
}

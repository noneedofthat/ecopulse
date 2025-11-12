// Guardian API Configuration
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY || import.meta.env.VITE_NEWS_API_KEY;
const GUARDIAN_BASE_URL = 'https://content.guardianapis.com';

const NEWS_CATEGORIES = {
  all: 'climate change OR environment OR sustainability OR renewable energy',
  climate: 'climate change OR global warming',
  energy: 'renewable energy OR solar power OR wind power OR clean energy',
  conservation: 'conservation OR wildlife OR biodiversity',
  pollution: 'pollution OR air quality OR water pollution',
  sustainability: 'sustainability OR sustainable development OR green technology',
};

const CACHE_CONFIG = {
  prefix: 'ecopulse_news_',
  ttl: 5 * 60 * 1000, // 5 minutes
};

/**
 * Get category-specific query string
 * @param {string} category - Category name
 * @returns {string} Query string for the category
 */
export function getCategoryQuery(category) {
  return NEWS_CATEGORIES[category] || NEWS_CATEGORIES.all;
}

/**
 * Transform Guardian API article to our format
 * @param {Object} guardianArticle - Guardian API article
 * @returns {Object} Transformed article
 */
function transformGuardianArticle(guardianArticle) {
  return {
    source: {
      id: 'the-guardian',
      name: 'The Guardian',
    },
    author: guardianArticle.fields?.byline || 'The Guardian',
    title: guardianArticle.webTitle,
    description: guardianArticle.fields?.trailText || guardianArticle.fields?.standfirst || '',
    url: guardianArticle.webUrl,
    urlToImage: guardianArticle.fields?.thumbnail || null,
    publishedAt: guardianArticle.webPublicationDate,
    content: guardianArticle.fields?.bodyText?.substring(0, 200) || '',
  };
}

/**
 * Generate cache key for articles
 * @param {string} category - Category name
 * @param {number} page - Page number
 * @returns {string} Cache key
 */
function getCacheKey(category, page) {
  return `${CACHE_CONFIG.prefix}${category}_${page}`;
}

/**
 * Get cached articles if available and not expired
 * @param {string} cacheKey - Cache key
 * @returns {Object|null} Cached data or null
 */
function getCachedArticles(cacheKey) {
  try {
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();

    // Check if cache has expired
    if (now - timestamp > CACHE_CONFIG.ttl) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
}

/**
 * Cache articles data
 * @param {string} cacheKey - Cache key
 * @param {Object} data - Data to cache
 */
function cacheArticles(cacheKey, data) {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error caching articles:', error);
  }
}

/**
 * Fetch articles from Guardian API
 * @param {string} category - Category name (default: 'all')
 * @param {number} page - Page number (default: 1)
 * @param {number} pageSize - Number of articles per page (default: 20)
 * @returns {Promise<Object>} Articles data
 */
export async function fetchArticles(category = 'all', page = 1, pageSize = 20) {
  try {
    // Check cache first
    const cacheKey = getCacheKey(category, page);
    const cachedData = getCachedArticles(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    // Build query parameters for Guardian API
    const query = getCategoryQuery(category);
    const params = new URLSearchParams({
      q: query,
      'page-size': pageSize.toString(),
      page: page.toString(),
      'show-fields': 'thumbnail,trailText,byline,bodyText,standfirst',
      'order-by': 'newest',
      'api-key': GUARDIAN_API_KEY,
    });

    // Make API request
    const url = `${GUARDIAN_BASE_URL}/search?${params}`;
    const response = await fetch(url);

    if (!response.ok) {
      // Handle rate limiting
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.response.status !== 'ok') {
      throw new Error(data.response.message || 'Failed to fetch articles');
    }

    // Transform Guardian API response to match our expected format
    const transformedData = {
      status: 'ok',
      totalResults: data.response.total,
      articles: data.response.results.map(transformGuardianArticle),
    };

    // Cache the results
    cacheArticles(cacheKey, transformedData);

    return transformedData;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
}

/**
 * Search articles by keyword using Guardian API
 * @param {string} query - Search query
 * @param {number} page - Page number (default: 1)
 * @returns {Promise<Object>} Articles data
 */
export async function searchArticles(query, page = 1) {
  try {
    const params = new URLSearchParams({
      q: query,
      'page-size': '20',
      page: page.toString(),
      'show-fields': 'thumbnail,trailText,byline,bodyText,standfirst',
      'order-by': 'newest',
      'api-key': GUARDIAN_API_KEY,
    });

    const url = `${GUARDIAN_BASE_URL}/search?${params}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.response.status !== 'ok') {
      throw new Error(data.response.message || 'Failed to search articles');
    }

    // Transform Guardian API response to match our expected format
    return {
      status: 'ok',
      totalResults: data.response.total,
      articles: data.response.results.map(transformGuardianArticle),
    };
  } catch (error) {
    console.error('Error searching articles:', error);
    throw error;
  }
}

/**
 * Clear all cached articles
 */
export function clearCache() {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(CACHE_CONFIG.prefix)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}

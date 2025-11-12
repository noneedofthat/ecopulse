// API Configuration

// NewsAPI.org configuration
export const NEWS_API_CONFIG = {
  baseUrl: 'https://newsapi.org/v2',
  apiKey: import.meta.env.VITE_NEWS_API_KEY,
  defaultParams: {
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: 20,
  },
};

// Category query mappings for environmental news
export const NEWS_CATEGORIES = {
  all: '(climate change OR global warming) OR (environment OR environmental) OR (renewable energy OR solar power OR wind power OR clean energy)',
  'climate-change': 'climate change OR global warming OR carbon emissions',
  wildlife: 'wildlife OR endangered species OR biodiversity OR conservation',
  pollution: 'pollution OR air quality OR ocean plastic OR waste management',
  'renewable-energy': 'renewable energy OR solar power OR wind power OR clean energy',
};

// API endpoints
export const API_ENDPOINTS = {
  everything: '/everything',
  topHeadlines: '/top-headlines',
};

// Cache configuration
export const CACHE_CONFIG = {
  ttl: 15 * 60 * 1000, // 15 minutes in milliseconds
  prefix: 'ecopulse_cache_',
};

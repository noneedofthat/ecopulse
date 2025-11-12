import quotesData from '../data/quotes.json';

const CACHE_KEY = 'ecopulse_quote_of_day';
const CACHE_DATE_KEY = 'ecopulse_quote_date';

/**
 * Get hash from date string for consistent daily quote
 * @param {string} dateString - Date string
 * @returns {number} Hash value
 */
function getDateHash(dateString) {
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * Get quote of the day
 * @returns {Object} Quote object
 */
export function getQuoteOfTheDay() {
  try {
    const today = new Date().toDateString();
    const cachedDate = localStorage.getItem(CACHE_DATE_KEY);
    const cachedQuote = localStorage.getItem(CACHE_KEY);

    // Return cached quote if it's from today
    if (cachedDate === today && cachedQuote) {
      return JSON.parse(cachedQuote);
    }

    // Generate new quote for today
    const hash = getDateHash(today);
    const index = hash % quotesData.length;
    const quote = quotesData[index];

    // Cache the quote
    localStorage.setItem(CACHE_KEY, JSON.stringify(quote));
    localStorage.setItem(CACHE_DATE_KEY, today);

    return quote;
  } catch (error) {
    console.error('Error getting quote of the day:', error);
    // Return fallback quote
    return quotesData[0];
  }
}

/**
 * Get random quote
 * @returns {Object} Quote object
 */
export function getRandomQuote() {
  const index = Math.floor(Math.random() * quotesData.length);
  return quotesData[index];
}

/**
 * Get all quotes
 * @returns {Array} Array of quote objects
 */
export function getAllQuotes() {
  return quotesData;
}

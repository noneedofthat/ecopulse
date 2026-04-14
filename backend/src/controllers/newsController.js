import axios from 'axios'

const GUARDIAN_BASE = 'https://content.guardianapis.com'
const GUARDIAN_KEY  = process.env.GUARDIAN_API_KEY
const PAGE_SIZE     = 12

// Guardian sections that count as "environment"
const ENV_SECTIONS = [
  'environment',
  'science',
  'sustainable-business',
  'global-development',
].join('|')

// Known Indian city & state names for tag-based boosting
const INDIA_KEYWORDS = [
  'India', 'Indian', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai',
  'Kolkata', 'Pune', 'Hyderabad', 'Ahmedabad', 'Rajasthan',
  'Kerala', 'Tamil Nadu', 'Maharashtra', 'Gujarat',
]

/**
 * GET /api/news
 *
 * Query params:
 *   page       {number}  – pagination page (default 1)
 *   q          {string}  – free-text keyword search
 *   section    {string}  – guardian section id or 'all'
 *   location   {string}  – location string, e.g. "India", "Pune", "" = global
 *   orderBy    {string}  – newest | oldest | relevance (default newest)
 */
export async function getNews(req, res, next) {
  try {
    const {
      page    = 1,
      q       = '',
      section = 'all',
      location = '',
      orderBy = 'newest',
    } = req.query

    // ── Build the Guardian search query ──────────────────────────────────────
    //
    // Base env query: ensures we only ever get eco-relevant stories
    const baseEnvQ = 'environment OR climate OR wildlife OR biodiversity OR "renewable energy" OR conservation OR "carbon emissions" OR pollution OR "climate change"'

    let searchQ

    if (location && location.toLowerCase() !== 'global') {
      // Location-scoped query: "{location}" AND (env keywords)
      // Wrap location in quotes if multi-word to prevent partial matches
      const locTerm = location.includes(' ') ? `"${location}"` : location
      if (q) {
        // Both location + keyword: most specific
        searchQ = `${locTerm} AND "${q}" AND (${baseEnvQ})`
      } else {
        // Location only
        searchQ = `${locTerm} AND (${baseEnvQ})`
      }
    } else if (q) {
      // Keyword-only search (no location)
      searchQ = `"${q}" AND (${baseEnvQ})`
    } else {
      // Default: global env news
      searchQ = baseEnvQ
    }

    // ── Guardian API params ───────────────────────────────────────────────────
    const params = {
      'api-key':     GUARDIAN_KEY,
      q:             searchQ,
      'page-size':   PAGE_SIZE,
      page:          parseInt(page, 10),
      'order-by':    validateOrderBy(orderBy),
      'show-fields': 'thumbnail,trailText,bodyText,wordcount,byline',
      'show-tags':   'keyword',
      // Use selected section OR fall back to all env sections
      section: section && section !== 'all' ? section : ENV_SECTIONS,
    }

    const { data } = await axios.get(`${GUARDIAN_BASE}/search`, { params })
    const results  = data.response

    if (!results || !results.results) {
      return res.json({ articles: [], pagination: emptyPagination() })
    }

    let articles = results.results.map(formatArticle)

    // ── India-specific post-processing ────────────────────────────────────────
    // When filtering for India, boost articles whose tags contain Indian
    // city/state names to the top, then sort remaining by date descending.
    if (location && isIndiaLocation(location)) {
      articles = sortByIndiaRelevance(articles)
    }

    // ── Client-side chronological sort guarantee ──────────────────────────────
    // Guardian's "newest" is already correct but we enforce it on our end too
    // so any post-processing above doesn't disturb chronological order.
    if (orderBy === 'newest') {
      articles.sort((a, b) => new Date(b.date) - new Date(a.date))
    } else if (orderBy === 'oldest') {
      articles.sort((a, b) => new Date(a.date) - new Date(b.date))
    }

    res.json({
      articles,
      pagination: {
        currentPage:  results.currentPage,
        totalPages:   Math.min(results.pages, 50), // Guardian caps at page 50 on free tier
        pageSize:     results.pageSize,
        totalResults: results.total,
      },
    })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/news/suggestions
 * Returns lightweight autocomplete suggestions from the Guardian tag API.
 * Used by the SearchBar dropdown.
 */
export async function getSearchSuggestions(req, res, next) {
  try {
    const { q = '' } = req.query
    if (!q || q.length < 2) return res.json({ suggestions: [] })

    const { data } = await axios.get(`${GUARDIAN_BASE}/tags`, {
      params: {
        'api-key':   GUARDIAN_KEY,
        q,
        type:        'keyword',
        'page-size': 8,
      },
    })

    const suggestions = (data.response?.results || []).map((t) => ({
      id:    t.id,
      label: t.webTitle,
      type:  t.type,
    }))

    res.json({ suggestions })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/news/:id
 * Full article body — used by AI summary (Increment 4).
 */
export async function getArticleById(req, res, next) {
  try {
    const { id } = req.params
    const contentPath = Buffer.from(id, 'base64').toString('utf8')

    const { data } = await axios.get(`${GUARDIAN_BASE}/${contentPath}`, {
      params: {
        'api-key':     GUARDIAN_KEY,
        'show-fields': 'bodyText,thumbnail,trailText,byline,wordcount',
      },
    })

    const article = data.response.content
    res.json({
      id:        article.id,
      title:     article.webTitle,
      body:      article.fields?.bodyText?.replace(/<[^>]+>/g, '') || '',
      trailText: article.fields?.trailText || '',
      byline:    article.fields?.byline    || '',
      thumbnail: article.fields?.thumbnail || null,
      url:       article.webUrl,
      date:      article.webPublicationDate,
      wordcount: article.fields?.wordcount || 0,
    })
  } catch (err) {
    next(err)
  }
}

// ── Internal helpers ─────────────────────────────────────────────────────────

function formatArticle(item) {
  const rawBody = item.fields?.bodyText || ''
  const cleanBody = rawBody.replace(/<[^>]+>/g, '').trim()

  return {
    id:           Buffer.from(item.id).toString('base64'),
    guardianId:   item.id,
    title:        item.webTitle,
    section:      item.sectionId,
    sectionLabel: item.sectionName,
    date:         item.webPublicationDate,
    url:          item.webUrl,
    thumbnail:    item.fields?.thumbnail || null,
    trailText:    item.fields?.trailText || '',
    byline:       item.fields?.byline    || '',
    wordcount:    parseInt(item.fields?.wordcount || '0', 10),
    excerpt:      cleanBody
      ? cleanBody.slice(0, 300).trimEnd() + '…'
      : item.fields?.trailText || '',
    tags: (item.tags || []).slice(0, 4).map((t) => t.webTitle),
  }
}

function validateOrderBy(orderBy) {
  const allowed = ['newest', 'oldest', 'relevance']
  return allowed.includes(orderBy) ? orderBy : 'newest'
}

function isIndiaLocation(location) {
  const lower = location.toLowerCase()
  return INDIA_KEYWORDS.some((k) => lower.includes(k.toLowerCase()))
}

function sortByIndiaRelevance(articles) {
  return articles.sort((a, b) => {
    const aScore = indiaScore(a)
    const bScore = indiaScore(b)
    if (bScore !== aScore) return bScore - aScore
    return new Date(b.date) - new Date(a.date)
  })
}

function indiaScore(article) {
  let score = 0
  const text = `${article.title} ${article.trailText} ${article.tags.join(' ')}`.toLowerCase()
  INDIA_KEYWORDS.forEach((k) => {
    if (text.includes(k.toLowerCase())) score++
  })
  return score
}

function emptyPagination() {
  return { currentPage: 1, totalPages: 1, pageSize: PAGE_SIZE, totalResults: 0 }
}

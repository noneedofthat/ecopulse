/**
 * EcoPulse utility helpers
 */

/**
 * Format an ISO date string to a human-readable relative time
 * e.g. "2 hours ago", "3 days ago"
 */
export function timeAgo(isoString) {
  const date  = new Date(isoString)
  const now   = new Date()
  const diff  = Math.floor((now - date) / 1000)   // seconds

  if (diff < 60)              return 'Just now'
  if (diff < 3600)            return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400)           return `${Math.floor(diff / 3600)}h ago`
  if (diff < 86400 * 7)       return `${Math.floor(diff / 86400)}d ago`

  return date.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

/**
 * Format a date to readable string
 * e.g. "14 Apr 2025"
 */
export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

/**
 * Truncate a string to `maxLen` characters with ellipsis
 */
export function truncate(str, maxLen = 120) {
  if (!str || str.length <= maxLen) return str
  return str.slice(0, maxLen).trimEnd() + '…'
}

/**
 * Map Guardian section id to display label
 */
export const SECTION_LABELS = {
  'all':                    'All Topics',
  'environment':            'Environment',
  'science':                'Science',
  'world':                  'World',
  'cities':                 'Cities',
  'sustainable-business':   'Sustainable Business',
  'global-development':     'Global Development',
  'animals-farmed':         'Farmed Animals',
}

/**
 * AQI colour helpers
 * Based on WHO / US AQI scale
 */
export function aqiColor(value) {
  if (value <= 50)  return 'text-aqi-good'
  if (value <= 100) return 'text-aqi-moderate'
  if (value <= 150) return 'text-aqi-unhealthy'
  return 'text-aqi-hazardous'
}

export function aqiLabel(value) {
  if (value <= 50)  return 'Good'
  if (value <= 100) return 'Moderate'
  if (value <= 150) return 'Unhealthy'
  if (value <= 200) return 'Very Unhealthy'
  return 'Hazardous'
}

/**
 * Capitalise first letter of a string
 */
export function capitalise(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

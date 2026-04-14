import axios from 'axios'

/**
 * Central Axios instance — all API calls go through here.
 * Base URL resolves to the Vite dev proxy in development
 * and to the Railway backend URL in production via VITE_API_URL.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,   // sends HTTP-only cookies for auth
})

// Debug: Log the API URL being used
console.log('[EcoPulse] API Base URL:', import.meta.env.VITE_API_URL || '/api (using proxy)')
console.log('[EcoPulse] All env vars:', import.meta.env)

// ── Request interceptor — attach JWT if stored ────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    // Token is read from localStorage via Zustand persist
    try {
      const raw = localStorage.getItem('ecopulse-auth')
      if (raw) {
        const { state } = JSON.parse(raw)
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`
        }
      }
    } catch (_) { /* ignore */ }
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response interceptor — global error normalisation ─────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred'
    return Promise.reject(new Error(message))
  }
)

export default apiClient

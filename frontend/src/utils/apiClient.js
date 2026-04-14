import axios from 'axios'

/**
 * Central Axios instance — all API calls go through here.
 * Base URL resolves to the Vite dev proxy in development
 * and to the Railway backend URL in production.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,   // sends HTTP-only cookies for auth
})

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

import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from '@components/layout/Layout'
import ProtectedRoute from '@components/auth/ProtectedRoute'
import HomePage from '@pages/HomePage'
import AQIPage from '@pages/AQIPage'
import NGOPage from '@pages/NGOPage'
import AboutPage from '@pages/AboutPage'
import FeedbackPage from '@pages/FeedbackPage'
import NotFoundPage from '@pages/NotFoundPage'
import useAuthStore from '@store/authStore'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

export default function App() {
  const initialize = useAuthStore((state) => state.initialize)

  // Initialize auth on mount
  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index        element={<HomePage />} />
          <Route path="aqi"      element={<AQIPage />} />
          <Route path="ngo"      element={<NGOPage />} />
          <Route path="about"    element={<AboutPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="*"        element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import useAuthStore from '@/store/authStore'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to home with a message
      navigate('/', { state: { message: 'Please sign in to access this page' } })
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-forest-600 mx-auto mb-4" />
          <p className="text-forest-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return children
}

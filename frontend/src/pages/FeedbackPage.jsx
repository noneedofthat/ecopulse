import { useState } from 'react'
import { MessageSquare, Lock, CheckCircle, Loader2 } from 'lucide-react'
import useAuthStore from '@store/authStore'
import { supabase } from '@/lib/supabase'

export default function FeedbackPage() {
  const { user, signInWithGoogle } = useAuthStore()
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Sign in failed:', error)
      alert('Failed to sign in. Please try again.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!category || !message.trim()) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { error: submitError } = await supabase
        .from('feedback')
        .insert([
          {
            user_id: user.id,
            user_email: user.email,
            category,
            message: message.trim(),
            rating: rating || null,
          }
        ])

      if (submitError) throw submitError

      // Success!
      setSubmitted(true)
      setCategory('')
      setMessage('')
      setRating(0)
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      console.error('Feedback submission error:', err)
      setError(err.message || 'Failed to submit feedback. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-forest-900 text-white py-12">
        <div className="page-container">
          <div className="w-10 h-10 rounded-xl bg-forest-700 flex items-center justify-center mb-4">
            <MessageSquare size={20} className="text-forest-300" />
          </div>
          <h1 className="section-title text-white mb-2">Feedback</h1>
          <p className="text-forest-300 max-w-md">
            Help us improve EcoPulse. Your feedback shapes the platform.
          </p>
        </div>
      </section>

      <div className="page-container py-12 max-w-2xl">
        {user ? (
          /* Authenticated — feedback form */
          <div className="card p-8">
            <p className="text-forest-600 mb-6 text-sm">
              Signed in as <strong className="text-forest-800">{user.email}</strong>
            </p>

            {/* Success Message */}
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-800">Thank you!</p>
                  <p className="text-sm text-green-700">Your feedback has been submitted successfully.</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-forest-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select 
                  className="input-base"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select a category…</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Content Issue">Content Issue</option>
                  <option value="General Feedback">General Feedback</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-forest-700 mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="input-base min-h-[120px] resize-y"
                  placeholder="Tell us what you think…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                <p className="text-xs text-forest-500 mt-1">
                  {message.length} characters
                </p>
              </div>

              {/* Star rating */}
              <div>
                <label className="block text-sm font-medium text-forest-700 mb-1.5">
                  Rating (optional)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className={`text-3xl transition-colors duration-150 ${
                        star <= (hoveredRating || rating)
                          ? 'text-amber-500'
                          : 'text-forest-200'
                      }`}
                      aria-label={`${star} star${star > 1 ? 's' : ''}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-xs text-forest-500 mt-1">
                    You rated {rating} star{rating > 1 ? 's' : ''}
                  </p>
                )}
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Feedback'
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Unauthenticated — prompt */
          <div className="card p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-forest-100 flex items-center
                            justify-center mx-auto mb-5">
              <Lock size={28} className="text-forest-500" />
            </div>
            <h2 className="font-display text-2xl font-bold text-forest-900 mb-3">
              Sign in to leave feedback
            </h2>
            <p className="text-forest-600 mb-6 max-w-sm mx-auto">
              We require a free account to prevent spam and attribute
              your valuable feedback correctly.
            </p>
            <button onClick={handleSignIn} className="btn-primary mx-auto px-8 py-3">
              Sign in with Google
            </button>
            <p className="text-forest-400 text-xs mt-4">
              Powered by Supabase Auth
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

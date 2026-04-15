import { useState, useEffect, useRef } from 'react'
import { X, Sparkles, Loader2, AlertCircle, ExternalLink } from 'lucide-react'

export default function SummaryModal({ article, onClose }) {
  const [summary, setSummary] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const summaryRef = useRef(null)
  const abortControllerRef = useRef(null)

  useEffect(() => {
    fetchSummary()
    
    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [article.id])

  // Auto-scroll to bottom as content streams in
  useEffect(() => {
    if (summaryRef.current && isStreaming) {
      summaryRef.current.scrollTop = summaryRef.current.scrollHeight
    }
  }, [summary, isStreaming])

  async function fetchSummary() {
    try {
      setIsLoading(true)
      setError(null)
      setSummary('')
      setIsStreaming(true)

      // Create abort controller for cleanup
      abortControllerRef.current = new AbortController()

      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
      const response = await fetch(`${API_BASE}/ai/summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId: article.id }),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        throw new Error('Failed to generate summary')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6))
            
            if (data.error) {
              throw new Error(data.error)
            }
            
            if (data.done) {
              setIsStreaming(false)
              setIsLoading(false)
              return
            }
            
            if (data.text) {
              setSummary(prev => prev + data.text)
            }
          }
        }
      }

      setIsStreaming(false)
      setIsLoading(false)

    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Summary fetch aborted')
        return
      }
      console.error('Summary error:', err)
      setError(err.message || 'Failed to generate summary')
      setIsLoading(false)
      setIsStreaming(false)
    }
  }

  // Close on Escape key
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div 
      className="modal-backdrop animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-modal max-w-2xl w-full max-h-[70vh] 
                   flex flex-col overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="flex items-start gap-3 p-4 border-b border-forest-100 shrink-0">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl 
                         bg-gradient-to-br from-forest-500 to-forest-600 shrink-0">
            <Sparkles className="text-white" size={18} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-lg font-bold text-forest-900 mb-0.5">
              AI Summary
            </h2>
            <p className="text-xs text-forest-600 line-clamp-1">
              {article.title}
            </p>
          </div>

          <button
            onClick={onClose}
            className="btn-ghost p-1.5 shrink-0"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Content ─────────────────────────────────────────────── */}
        <div 
          ref={summaryRef}
          className="flex-1 overflow-y-auto p-5 space-y-3 min-h-0"
        >
          {error ? (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 
                           rounded-xl text-red-800">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Failed to generate summary</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          ) : (
            <>
              {/* Streaming summary text */}
              <div className="prose prose-forest max-w-none">
                {summary.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-forest-700 leading-relaxed mb-3 text-sm">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex items-center gap-3 text-forest-600">
                  <Loader2 size={18} className="animate-spin" />
                  <span className="text-sm">
                    {summary ? 'Generating...' : 'Analyzing article...'}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-3 p-4 border-t 
                       border-forest-100 bg-forest-50 shrink-0">
          <p className="text-xs text-forest-500 flex items-center gap-1.5">
            <Sparkles size={11} />
            Powered by Gemini AI
          </p>
          
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-1.5 px-3"
          >
            Read Full Article
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  )
}

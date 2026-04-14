import { AlertTriangle, RefreshCw } from 'lucide-react'

/**
 * ErrorMessage — displayed when an API call fails
 * Props: message, onRetry
 */
export default function ErrorMessage({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
        <AlertTriangle size={26} className="text-red-400" />
      </div>
      <h3 className="font-semibold text-forest-900 mb-1">Unable to load data</h3>
      <p className="text-forest-500 text-sm max-w-xs mb-5">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary text-sm gap-1.5">
          <RefreshCw size={14} />
          Try again
        </button>
      )}
    </div>
  )
}

import { NavLink } from 'react-router-dom'
import { Leaf, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center px-4">
        {/* Large leaf illustration */}
        <div className="w-32 h-32 mx-auto mb-6 opacity-20 animate-float">
          <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M64 12 Q96 32 96 64 Q96 100 64 116 Q32 100 32 64 Q32 32 64 12Z"
              fill="#2d6a4f"
            />
            <line x1="64" y1="12" x2="64" y2="116" stroke="#52b788" strokeWidth="2"/>
            <line x1="64" y1="55" x2="88" y2="48" stroke="#52b788" strokeWidth="1.5"/>
            <line x1="64" y1="72" x2="42" y2="65" stroke="#52b788" strokeWidth="1.5"/>
            <line x1="64" y1="88" x2="85" y2="83" stroke="#52b788" strokeWidth="1.5"/>
          </svg>
        </div>

        <p className="text-8xl font-display font-bold text-forest-200 leading-none mb-2">
          404
        </p>
        <h1 className="font-display text-2xl font-bold text-forest-900 mb-3">
          Page not found
        </h1>
        <p className="text-forest-500 max-w-xs mx-auto mb-8">
          This page seems to have gone back to nature. Let's get you back on track.
        </p>

        <NavLink to="/" className="btn-primary inline-flex">
          <ArrowLeft size={16} />
          Back to Home
        </NavLink>
      </div>
    </div>
  )
}

import { ExternalLink, Globe } from 'lucide-react'

export default function NGOCard({ ngo }) {
  return (
    <div className="card p-6 hover:shadow-lg transition-shadow">
      {/* Logo and Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="text-5xl">{ngo.logo}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-display text-lg font-bold text-forest-900 leading-tight">
              {ngo.name}
            </h3>
            <span className="badge bg-forest-100 text-forest-700 text-xs shrink-0">
              {ngo.region}
            </span>
          </div>
          <p className="text-sm text-forest-600 italic">{ngo.tagline}</p>
        </div>
      </div>

      {/* Category Badge */}
      <div className="mb-3">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-forest-50 text-forest-700 text-xs font-medium">
          {ngo.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-forest-600 leading-relaxed mb-4">
        {ngo.description}
      </p>

      {/* Actions */}
      <div className="flex gap-2">
        <a
          href={ngo.donateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex-1 justify-center gap-2 text-sm"
        >
          <ExternalLink size={14} />
          Donate
        </a>
        <a
          href={ngo.website}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost px-4 gap-2 text-sm"
          title="Visit website"
        >
          <Globe size={14} />
          Website
        </a>
      </div>
    </div>
  )
}

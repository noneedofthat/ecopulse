import { Globe, MapPin, Flag } from 'lucide-react'
import useNewsStore from '@store/newsStore'

/**
 * LocationFilter — three-mode toggle
 *
 * Global  — worldwide env news (default)
 * India   — India-only, sorted latest first
 * Custom  — whatever the user typed in SearchBar (auto-selected)
 */
const MODES = [
  {
    id:    'global',
    label: 'Global',
    icon:  Globe,
    desc:  'Worldwide environmental news',
  },
  {
    id:    'india',
    label: 'India',
    icon:  Flag,
    desc:  'India-specific news only',
  },
]

export default function LocationFilter() {
  const { locationMode, customLocation, setLocationMode } = useNewsStore()

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-medium text-forest-500 shrink-0">Location:</span>

      {/* Global + India toggle buttons */}
      {MODES.map(({ id, label, icon: Icon, desc }) => (
        <button
          key={id}
          onClick={() => setLocationMode(id)}
          title={desc}
          aria-pressed={locationMode === id}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium
                      transition-all duration-200 border
                      ${locationMode === id
                        ? 'bg-forest-700 text-white border-forest-700 shadow-sm'
                        : 'bg-white text-forest-600 border-forest-200 hover:border-forest-400 hover:bg-forest-50'
                      }`}
        >
          <Icon size={12} />
          {label}
        </button>
      ))}

      {/* Custom location chip — shown automatically when user typed a place */}
      {locationMode === 'custom' && customLocation && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium
                        bg-forest-700 text-white border border-forest-700 shadow-sm">
          <MapPin size={12} />
          {customLocation}
        </div>
      )}
    </div>
  )
}

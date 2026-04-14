import { Leaf, Trees, Waves, Zap, Globe2, Sprout } from 'lucide-react'

const categories = [
  { id: 'all', label: 'All', icon: Globe2 },
  { id: 'Wildlife', label: 'Wildlife', icon: Leaf },
  { id: 'Forest', label: 'Forest', icon: Trees },
  { id: 'Ocean', label: 'Ocean', icon: Waves },
  { id: 'Climate', label: 'Climate', icon: Sprout },
  { id: 'Renewable Energy', label: 'Renewable Energy', icon: Zap },
  { id: 'Conservation', label: 'Conservation', icon: Globe2 },
]

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const Icon = cat.icon
        const isActive = selected === cat.id
        
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm
              transition-all duration-200
              ${isActive
                ? 'bg-forest-600 text-white shadow-md'
                : 'bg-white text-forest-700 hover:bg-forest-50 border border-forest-200'
              }
            `}
          >
            <Icon size={16} />
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}

import { Globe, Leaf, Microscope, Recycle, HandHeart } from 'lucide-react'
import useNewsStore from '@store/newsStore'

const SECTIONS = [
  { id: 'all',                  label: 'All Topics',        icon: Globe },
  { id: 'environment',          label: 'Environment',       icon: Leaf },
  { id: 'science',              label: 'Science',           icon: Microscope },
  { id: 'sustainable-business', label: 'Sustainable Biz',   icon: Recycle },
  { id: 'global-development',   label: 'Global Dev',        icon: HandHeart },
]

export default function CategoryFilter() {
  const { selectedSection, setSelectedSection } = useNewsStore()

  return (
    <div
      className="flex gap-2 overflow-x-auto scrollbar-hide py-1 -mx-1 px-1"
      role="group"
      aria-label="Filter by topic category"
    >
      {SECTIONS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setSelectedSection(id)}
          aria-pressed={selectedSection === id}
          className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium
                      transition-all duration-200 whitespace-nowrap flex items-center gap-2
                      ${selectedSection === id
                        ? 'bg-forest-700 text-white shadow-sm scale-[1.03]'
                        : 'bg-white text-forest-700 border border-forest-200 hover:border-forest-400 hover:bg-forest-50'
                      }`}
        >
          <Icon size={14} />
          {label}
        </button>
      ))}
    </div>
  )
}

import { Leaf, Wind, Globe, ArrowRight, TrendingUp, Newspaper } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import NewsFeed       from '@components/news/NewsFeed'
import CategoryFilter from '@components/news/CategoryFilter'
import SearchBar      from '@components/news/SearchBar'
import Pagination     from '@components/news/Pagination'
import LocationFilter from '@components/news/LocationFilter'
import SortControl    from '@components/news/SortControl'
import ActiveFilterBar from '@components/news/ActiveFilterBar'
import useNews        from '@hooks/useNews'
import useNewsStore   from '@store/newsStore'

const STATS = [
  { label: 'Articles Indexed', value: '50K+',  icon: Globe },
  { label: 'Topics Covered',   value: '12',    icon: Leaf  },
  { label: 'AQI Cities',       value: '200+',  icon: Wind  },
  { label: 'NGOs Listed',      value: '20+',   icon: TrendingUp },
]

export default function HomePage() {
  const { articles, loading, error, currentPage, setCurrentPage, retry } = useNews()
  const { totalPages, totalResults, searchQuery, locationMode, customLocation } = useNewsStore()

  // Build a human-readable headline for the news section
  function buildHeadline() {
    if (locationMode === 'india')                  return '🇮🇳 India Environmental News'
    if (locationMode === 'custom' && customLocation) return `📍 News from "${customLocation}"`
    if (searchQuery)                               return `Results for "${searchQuery}"`
    return 'Latest Environmental News'
  }

  return (
    <div className="min-h-screen">

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative bg-forest-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-forest-950/80 via-forest-900 to-forest-800/90" />

        {/* Decorative leaf */}
        <div className="absolute right-8 top-12 w-56 h-56 opacity-10 animate-float hidden lg:block">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 20 Q140 50 140 100 Q140 160 100 180 Q60 160 60 100 Q60 50 100 20Z" fill="#52b788"/>
            <line x1="100" y1="20"  x2="100" y2="180" stroke="#d8f3dc" strokeWidth="2"/>
            <line x1="100" y1="80"  x2="130" y2="70"  stroke="#d8f3dc" strokeWidth="1.5"/>
            <line x1="100" y1="100" x2="70"  y2="90"  stroke="#d8f3dc" strokeWidth="1.5"/>
            <line x1="100" y1="120" x2="128" y2="115" stroke="#d8f3dc" strokeWidth="1.5"/>
          </svg>
        </div>

        <div className="relative page-container py-14 md:py-22">
          <div className="max-w-2xl">
            <span className="badge bg-forest-700/60 text-forest-200 mb-4 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-400 mr-2 animate-pulse-green" />
              Live Environmental Updates
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-5 text-balance">
              Your Pulse on<br />
              <span className="text-forest-400">the Planet</span>
            </h1>
            <p className="text-forest-200 text-lg leading-relaxed mb-7 max-w-lg">
              Real-time environmental news with AI summaries, global AQI tracking,
              and curated conservation resources.
            </p>
            <div className="flex flex-wrap gap-3">
              <NavLink to="/aqi" className="btn-outline border-forest-400 text-forest-200
                                             hover:bg-forest-700 hover:text-white px-5 py-2.5">
                <Wind size={16} /> Check AQI
              </NavLink>
              <NavLink to="/ngo" className="btn-ghost text-forest-300 hover:text-white
                                             hover:bg-forest-800 px-5 py-2.5">
                <Globe size={16} /> Explore NGOs
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────── */}
      <section className="bg-forest-800 text-white">
        <div className="page-container py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-forest-700 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-forest-300" />
                </div>
                <div>
                  <p className="text-base font-bold text-white font-display leading-none">{value}</p>
                  <p className="text-xs text-forest-400 mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── News Section ───────────────────────────────── */}
      <section className="page-container py-10">

        {/* Section header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-forest-700 flex items-center justify-center shrink-0">
              <Newspaper size={16} className="text-forest-200" />
            </div>
            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-forest-900 leading-tight">
                {buildHeadline()}
              </h2>
              {!loading && totalResults > 0 && (
                <p className="text-forest-500 text-xs mt-0.5">
                  {totalResults.toLocaleString()} articles · sorted{' '}
                  {useNewsStore.getState().sortOrder === 'newest' ? 'latest first' :
                   useNewsStore.getState().sortOrder === 'oldest' ? 'oldest first' : 'by relevance'}
                </p>
              )}
            </div>
          </div>

          {/* Sort control — top-right of section */}
          <div className="shrink-0">
            <SortControl />
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-4 relative">
          <SearchBar />
        </div>

        {/* Location + Category filters row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <LocationFilter />
        </div>

        {/* Category pills */}
        <div className="mb-4">
          <CategoryFilter />
        </div>

        {/* Active filter chips */}
        <ActiveFilterBar />

        {/* The feed */}
        <NewsFeed articles={articles} loading={loading} error={error} onRetry={retry} />

        {/* Pagination */}
        {!loading && !error && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </section>

      {/* ── Feature Highlights ─────────────────────────── */}
      <section className="bg-forest-100/60 py-12 mt-4">
        <div className="page-container">
          <h2 className="section-title text-center mb-2">Explore EcoPulse</h2>
          <p className="section-subtitle text-center mb-8">More tools to stay connected with the planet</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { to: '/aqi',   icon: Wind,  title: 'AQI Tracker',   desc: 'Real-time air quality data with historical trend charts for any city worldwide.',   color: 'bg-forest-700' },
              { to: '/ngo',   icon: Globe, title: 'NGO Directory',  desc: '20+ curated environmental NGOs with direct donation page links.',                   color: 'bg-earth-700'  },
              { to: '/about', icon: Leaf,  title: 'About EcoPulse', desc: 'Our mission to make environmental data free and accessible to everyone everywhere.', color: 'bg-bark-500'   },
            ].map(({ to, icon: Icon, title, desc, color }) => (
              <NavLink
                key={to}
                to={to}
                className="card p-6 group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center
                                 mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="font-display text-base font-bold text-forest-900 mb-1.5">{title}</h3>
                <p className="text-forest-600 text-sm leading-relaxed">{desc}</p>
                <span className="inline-flex items-center gap-1 text-forest-500 text-sm mt-3
                                 group-hover:gap-2 transition-all duration-200 font-medium">
                  Explore <ArrowRight size={13} />
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

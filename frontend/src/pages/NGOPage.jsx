import { useState } from 'react'
import { Heart, Search } from 'lucide-react'
import NGOCard from '@/components/ngo/NGOCard'
import CategoryFilter from '@/components/ngo/CategoryFilter'
import ngosData from '@/data/ngos.json'

export default function NGOPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter NGOs
  const filteredNGOs = ngosData.filter(ngo => {
    const matchesCategory = selectedCategory === 'all' || ngo.category === selectedCategory
    const matchesSearch = ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ngo.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Featured NGOs (first 3)
  const featuredNGOs = ngosData.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <section className="bg-forest-900 text-white py-12">
        <div className="page-container">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-forest-700 flex items-center justify-center">
              <Heart size={20} className="text-forest-300" />
            </div>
            <span className="badge bg-forest-700/60 text-forest-200 text-xs">Support</span>
          </div>
          <h1 className="section-title text-white mb-2">Environmental NGOs</h1>
          <p className="text-forest-300 max-w-2xl">
            Discover and support organizations working to protect our planet. From wildlife
            conservation to renewable energy, these NGOs are making a real difference.
          </p>
        </div>
      </section>

      <div className="page-container py-10">
        {/* Featured Section */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-forest-900 mb-6">
            Featured Organizations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredNGOs.map(ngo => (
              <NGOCard key={ngo.id} ngo={ngo} />
            ))}
          </div>
        </section>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="max-w-xl">
            <label className="block text-sm font-medium text-forest-700 mb-2">
              Search organizations
            </label>
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or description..."
                className="input-base pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-forest-700 mb-2">
              Filter by category
            </label>
            <CategoryFilter
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-forest-600">
            Showing {filteredNGOs.length} organization{filteredNGOs.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* NGO Grid */}
        {filteredNGOs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNGOs.map(ngo => (
              <NGOCard key={ngo.id} ngo={ngo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-forest-500 mb-2">No organizations found</p>
            <p className="text-sm text-forest-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

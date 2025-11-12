import { useState } from 'react';
import { useNews } from '../../hooks/useNews';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import NewsCard from './NewsCard';
import LoadingSpinner from '../common/LoadingSpinner';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'public' },
  { id: 'climate-change', label: 'Climate', icon: 'thermostat' },
  { id: 'wildlife', label: 'Wildlife', icon: 'pets' },
  { id: 'pollution', label: 'Pollution', icon: 'warning' },
  { id: 'renewable-energy', label: 'Renewable Energy', icon: 'wb_sunny' },
];

export default function NewsFeed() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { articles, loading, error, loadMore, hasMore } = useNews(selectedCategory);
  const { observerRef } = useInfiniteScroll(loadMore, hasMore);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  if (loading && articles.length === 0) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" />
        <p className="text-center text-gray-600 mt-4">
          Loading environmental news...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <span className="material-icons text-6xl text-red-500 mb-4">error_outline</span>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Failed to Load News
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-eco-primary hover:bg-eco-secondary text-white rounded-md transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="py-12 text-center">
        <span className="material-icons text-6xl text-gray-400 mb-4">article</span>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Articles Found
        </h3>
        <p className="text-gray-600">
          Try selecting a different category
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Category Filter Buttons */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-lime-100 text-green-800 border-2 border-eco-primary shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-eco-primary hover:text-eco-primary'
              }`}
            >
              <span className="material-icons text-sm">{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {articles.map((article, index) => (
          <NewsCard key={`${article.url}-${index}`} article={article} />
        ))}
      </div>

      {/* Infinite Scroll Sentinel */}
      {hasMore && (
        <div ref={observerRef} className="py-8">
          <LoadingSpinner size="md" />
          <p className="text-center text-gray-600 mt-4">
            Loading more articles...
          </p>
        </div>
      )}

      {/* End of Content */}
      {!hasMore && articles.length > 0 && (
        <div className="py-8 text-center">
          <p className="text-gray-600">
            You've reached the end of the articles
          </p>
        </div>
      )}
    </div>
  );
}

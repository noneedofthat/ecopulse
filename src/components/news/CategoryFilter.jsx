import { motion } from 'framer-motion';

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categories = [
    { id: 'all', label: 'All', icon: 'public' },
    { id: 'climate-change', label: 'Climate Change', icon: 'thermostat' },
    { id: 'wildlife', label: 'Wildlife', icon: 'pets' },
    { id: 'pollution', label: 'Pollution', icon: 'air' },
    { id: 'renewable-energy', label: 'Renewable Energy', icon: 'wb_sunny' },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Filter by Category
      </h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all
              ${selectedCategory === category.id
                ? 'bg-eco-primary text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            <span className="material-icons text-sm">{category.icon}</span>
            <span>{category.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

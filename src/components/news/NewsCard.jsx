import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatRelativeTime, truncateText } from '../../utils/formatters';
import { summarizeArticle } from '../../services/geminiService';

export default function NewsCard({ article }) {
  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const fallbackImage = 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80';

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  const handleSummarize = async () => {
    if (summary) {
      setShowSummary(!showSummary);
      return;
    }

    setLoadingSummary(true);
    try {
      const result = await summarizeArticle(
        article.title,
        article.description || '',
        article.content || ''
      );
      setSummary(result);
      setShowSummary(true);
    } catch (error) {
      console.error('Error summarizing:', error);
      const errorMessage = error.message.includes('API key') 
        ? 'Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.'
        : 'Failed to generate summary. Please try again later.';
      setSummary(errorMessage);
      setShowSummary(true);
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-shadow"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={article.urlToImage || fallbackImage}
          alt={article.title}
          onError={handleImageError}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Source and Date */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-eco-primary">
            {article.source.name}
          </span>
          <span className="text-xs text-gray-500">
            {formatRelativeTime(article.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {truncateText(article.description, 150)}
        </p>

        {/* AI Summary */}
        {showSummary && summary && (
          <div className="mb-4 p-3 bg-eco-primary/10 rounded-md border border-eco-primary/20">
            <div className="flex items-start space-x-2">
              <span className="material-icons text-eco-primary text-sm mt-0.5">auto_awesome</span>
              <p className="text-sm text-gray-700">{summary}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSummarize}
            disabled={loadingSummary}
            className="inline-flex items-center text-eco-primary hover:text-eco-secondary font-medium transition-colors disabled:opacity-50"
          >
            <span className="material-icons text-sm mr-1">
              {loadingSummary ? 'hourglass_empty' : 'summarize'}
            </span>
            {loadingSummary ? 'Summarizing...' : showSummary ? 'Hide Summary' : 'Summarize'}
          </button>
          
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-eco-primary hover:text-eco-secondary font-medium transition-colors group"
          >
            Read More
            <span className="material-icons text-sm ml-1 group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

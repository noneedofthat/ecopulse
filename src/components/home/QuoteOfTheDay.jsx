import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getQuoteOfTheDay } from '../../services/quotesService';

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const dailyQuote = getQuoteOfTheDay();
      setQuote(dailyQuote);
    } catch (error) {
      console.error('Error loading quote:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-eco-primary to-eco-secondary rounded-lg p-8 text-white animate-pulse">
        <div className="h-6 bg-white/20 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-white/20 rounded w-1/4"></div>
      </div>
    );
  }

  if (!quote) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-eco-primary"
    >
      <div className="flex items-start space-x-4">
        <span className="material-icons text-4xl text-eco-primary">format_quote</span>
        <div className="flex-1">
          <p className="text-xl md:text-2xl font-medium mb-4 leading-relaxed text-gray-800">
            {quote.text}
          </p>
          <p className="text-sm md:text-base text-gray-600 font-medium">
            — {quote.author}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function StarRating({ value, onChange, readonly = false }) {
  const [hoverValue, setHoverValue] = useState(0);

  const handleClick = (rating) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  const handleKeyDown = (e, rating) => {
    if (readonly) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(rating);
    }
  };

  return (
    <div className="flex items-center space-x-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((rating) => {
        const isFilled = rating <= (hoverValue || value);
        
        return (
          <motion.button
            key={rating}
            type="button"
            onClick={() => handleClick(rating)}
            onMouseEnter={() => !readonly && setHoverValue(rating)}
            onMouseLeave={() => !readonly && setHoverValue(0)}
            onKeyDown={(e) => handleKeyDown(e, rating)}
            disabled={readonly}
            whileHover={!readonly ? { scale: 1.1 } : {}}
            whileTap={!readonly ? { scale: 0.9 } : {}}
            className={`focus:outline-none focus:ring-2 focus:ring-eco-primary rounded ${
              readonly ? 'cursor-default' : 'cursor-pointer'
            }`}
            aria-label={`${rating} star${rating > 1 ? 's' : ''}`}
            aria-checked={rating === value}
            role="radio"
          >
            <span
              className={`material-icons text-3xl transition-colors ${
                isFilled
                  ? 'text-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            >
              {isFilled ? 'star' : 'star_border'}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

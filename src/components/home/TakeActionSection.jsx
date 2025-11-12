import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ecoTipsData from '../../data/ecoTips.json';

export default function TakeActionSection() {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    // Get 4 random tips
    const shuffled = [...ecoTipsData].sort(() => 0.5 - Math.random());
    setTips(shuffled.slice(0, 4));
  }, []);

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Take Action Today
        </h2>
        <p className="text-gray-600">
          Small changes make a big difference
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((tip, index) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-lime-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-all border border-lime-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-lime-200 rounded-full flex items-center justify-center mb-4">
                <span className="material-icons text-3xl text-green-700">
                  {tip.icon}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                {tip.title}
              </h3>
              <p className="text-sm text-green-800">
                {tip.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

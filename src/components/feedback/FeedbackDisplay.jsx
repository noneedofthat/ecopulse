import { useState, useEffect } from 'react';
import { getFeedbackStats, getRecentFeedback } from '../../services/feedbackService';
import StarRating from './StarRating';
import LoadingSpinner from '../common/LoadingSpinner';
import { formatRelativeTime } from '../../utils/formatters';

export default function FeedbackDisplay() {
  const [stats, setStats] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      setLoading(true);
      const [statsData, feedbackData] = await Promise.all([
        getFeedbackStats(),
        getRecentFeedback(5),
      ]);
      setStats(statsData);
      setFeedback(feedbackData);
    } catch (err) {
      console.error('Error loading feedback:', err);
      setError('Failed to load feedback');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Community Feedback
      </h2>

      {/* Stats */}
      {stats && stats.count > 0 && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Rating</p>
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-gray-900">
                  {stats.averageRating}
                </span>
                <span className="material-icons text-yellow-400">star</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Total Reviews</p>
              <p className="text-3xl font-bold text-gray-900">{stats.count}</p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Feedback */}
      {feedback.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Reviews
          </h3>
          {feedback.map((item) => (
            <div
              key={item.id}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-gray-900">
                    {item.userName}
                  </p>
                  <StarRating value={item.rating} readonly />
                </div>
                <span className="text-xs text-gray-500">
                  {item.createdAt && formatRelativeTime(item.createdAt.toDate().toISOString())}
                </span>
              </div>
              <p className="text-gray-700 text-sm">{item.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <span className="material-icons text-6xl text-gray-400 mb-4">feedback</span>
          <p className="text-gray-600">
            No feedback yet. Be the first to share your thoughts!
          </p>
        </div>
      )}
    </div>
  );
}

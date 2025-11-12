import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { submitFeedback } from '../../services/feedbackService';
import StarRating from './StarRating';

export default function FeedbackForm({ onSuccess }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!comment.trim()) {
      newErrors.comment = 'Please provide your feedback';
    } else if (comment.trim().length < 10) {
      newErrors.comment = 'Feedback must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const userName = user.displayName || user.email.split('@')[0];
      await submitFeedback(user.uid, userName, rating, comment);
      
      setSubmitted(true);
      setRating(0);
      setComment('');
      
      if (onSuccess) {
        onSuccess();
      }

      // Reset submitted state after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setErrors({ general: 'Failed to submit feedback. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Share Your Feedback
      </h2>

      {submitted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-600 flex items-center">
            <span className="material-icons text-sm mr-2">check_circle</span>
            Thank you for your feedback!
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How would you rate your experience?
          </label>
          <StarRating value={rating} onChange={setRating} />
          {errors.rating && (
            <p className="mt-2 text-sm text-red-600">{errors.rating}</p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Feedback
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-eco-primary focus:border-transparent transition-colors resize-none
              ${errors.comment 
                ? 'border-red-500' 
                : 'border-gray-300'
              }
              bg-white text-gray-900`}
            placeholder="Tell us about your experience with EcoPulse..."
          />
          {errors.comment && (
            <p className="mt-1 text-sm text-red-600">{errors.comment}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-eco-primary hover:bg-eco-secondary text-white rounded-md transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
}

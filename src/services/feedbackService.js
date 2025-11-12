import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - User input
 * @returns {string} Sanitized input
 */
function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

/**
 * Submit feedback to Firestore
 * @param {string} userId - User ID
 * @param {string} userName - User display name
 * @param {number} rating - Rating (1-5)
 * @param {string} comment - Feedback comment
 * @param {string} category - Feedback category
 * @returns {Promise<Object>} Feedback document reference
 */
export async function submitFeedback(userId, userName, rating, comment, category = 'experience') {
  try {
    const sanitizedComment = sanitizeInput(comment);
    const sanitizedUserName = sanitizeInput(userName);

    const feedbackData = {
      userId,
      userName: sanitizedUserName,
      rating,
      comment: sanitizedComment,
      category,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'feedback'), feedbackData);
    return docRef;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
}

/**
 * Get feedback statistics (average rating and count)
 * @returns {Promise<Object>} Feedback stats
 */
export async function getFeedbackStats() {
  try {
    const feedbackQuery = query(collection(db, 'feedback'));
    const querySnapshot = await getDocs(feedbackQuery);

    if (querySnapshot.empty) {
      return { averageRating: 0, count: 0 };
    }

    let totalRating = 0;
    let count = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      totalRating += data.rating;
      count++;
    });

    const averageRating = totalRating / count;

    return {
      averageRating: Math.round(averageRating * 10) / 10,
      count,
    };
  } catch (error) {
    console.error('Error getting feedback stats:', error);
    throw error;
  }
}

/**
 * Get recent feedback entries
 * @param {number} limitCount - Number of feedback entries to retrieve
 * @returns {Promise<Array>} Array of feedback entries
 */
export async function getRecentFeedback(limitCount = 10) {
  try {
    const feedbackQuery = query(
      collection(db, 'feedback'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(feedbackQuery);
    const feedback = [];

    querySnapshot.forEach((doc) => {
      feedback.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return feedback;
  } catch (error) {
    console.error('Error getting recent feedback:', error);
    throw error;
  }
}

/**
 * Get user's feedback history
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of user's feedback entries
 */
export async function getUserFeedback(userId) {
  try {
    const feedbackQuery = query(
      collection(db, 'feedback'),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(feedbackQuery);
    const feedback = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.userId === userId) {
        feedback.push({
          id: doc.id,
          ...data,
        });
      }
    });

    return feedback;
  } catch (error) {
    console.error('Error getting user feedback:', error);
    throw error;
  }
}

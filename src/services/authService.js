import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendEmailVerification,
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, googleProvider, db } from '../config/firebase';

/**
 * Sign up a new user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} User credential
 */
export async function signUpWithEmail(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

/**
 * Sign in an existing user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} User credential
 */
export async function signInWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

/**
 * Sign in with Google OAuth
 * @returns {Promise<Object>} User credential
 */
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    // Store user profile in Firestore
    await setDoc(doc(db, 'users', result.user.uid), {
      email: result.user.email,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
      authProvider: 'google',
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    }, { merge: true });
    
    return result;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
}

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

/**
 * Get the current authenticated user
 * @returns {Object|null} Current user or null
 */
export function getCurrentUser() {
  return auth.currentUser;
}

/**
 * Generate a 6-digit verification code
 * @returns {string} 6-digit code
 */
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Store verification code in Firestore with expiration
 * @param {string} email - User's email
 * @param {string} code - Verification code
 * @returns {Promise<void>}
 */
export async function storeVerificationCode(email, code) {
  try {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15); // 15 minutes expiration
    
    await setDoc(doc(db, 'verificationCodes', email), {
      code,
      email,
      expiresAt: expiresAt.toISOString(),
      createdAt: serverTimestamp(),
      attempts: 0,
    });
    
    // In a real application, you would send this code via email
    // For now, we'll log it (remove in production)
    console.log(`Verification code for ${email}: ${code}`);
  } catch (error) {
    console.error('Error storing verification code:', error);
    throw error;
  }
}

/**
 * Send verification code to user's email
 * @param {string} email - User's email
 * @returns {Promise<void>}
 */
export async function sendVerificationCode(email) {
  try {
    const code = generateVerificationCode();
    await storeVerificationCode(email, code);
    
    // In a real application, integrate with an email service (SendGrid, AWS SES, etc.)
    // For now, we'll just log it
    console.log(`Verification code sent to ${email}: ${code}`);
  } catch (error) {
    console.error('Error sending verification code:', error);
    throw error;
  }
}

/**
 * Verify email with 6-digit code
 * @param {string} email - User's email
 * @param {string} code - Verification code
 * @returns {Promise<boolean>} True if verified, false otherwise
 */
export async function verifyEmailCode(email, code) {
  try {
    const docRef = doc(db, 'verificationCodes', email);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Verification code not found');
    }
    
    const data = docSnap.data();
    const now = new Date();
    const expiresAt = new Date(data.expiresAt);
    
    // Check if code has expired
    if (now > expiresAt) {
      await deleteDoc(docRef);
      throw new Error('Verification code has expired');
    }
    
    // Check if too many attempts
    if (data.attempts >= 5) {
      await deleteDoc(docRef);
      throw new Error('Too many verification attempts');
    }
    
    // Check if code matches
    if (data.code !== code) {
      // Increment attempts
      await setDoc(docRef, {
        ...data,
        attempts: data.attempts + 1,
      });
      throw new Error('Invalid verification code');
    }
    
    // Code is valid, delete it
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error verifying email code:', error);
    throw error;
  }
}

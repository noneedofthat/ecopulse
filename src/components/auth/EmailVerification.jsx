import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyEmailCode, sendVerificationCode } from '../../services/authService';

export default function EmailVerification({ email }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await verifyEmailCode(email, code);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setResending(true);
    setError(null);

    try {
      await sendVerificationCode(email);
      setResendCooldown(60);
      
      // Countdown timer
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="material-icons text-6xl text-eco-primary mb-4">mark_email_read</span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Verify Your Email
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          We've sent a 6-digit code to <strong>{email}</strong>
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Verification Code
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={handleCodeChange}
            maxLength={6}
            className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-eco-primary focus:border-transparent transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="000000"
          />
        </div>

        <button
          type="submit"
          disabled={loading || code.length !== 6}
          className="w-full px-6 py-3 bg-eco-primary hover:bg-eco-secondary text-white rounded-md transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>

      <div className="text-center">
        <button
          onClick={handleResend}
          disabled={resending || resendCooldown > 0}
          className="text-eco-primary hover:text-eco-secondary transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {resending 
            ? 'Sending...' 
            : resendCooldown > 0 
              ? `Resend code in ${resendCooldown}s` 
              : 'Resend code'}
        </button>
      </div>
    </div>
  );
}

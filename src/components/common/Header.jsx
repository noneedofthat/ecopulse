import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img src="/logo.png" alt="EcoPulse Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold text-eco-primary group-hover:text-eco-secondary transition-colors">
              EcoPulse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full font-medium transition-all border-2 ${
                isActive('/')
                  ? 'bg-lime-100 text-green-800 border-lime-300'
                  : 'text-gray-700 border-gray-300 hover:border-eco-primary hover:text-eco-primary'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-full font-medium transition-all border-2 ${
                isActive('/about')
                  ? 'bg-lime-100 text-green-800 border-lime-300'
                  : 'text-gray-700 border-gray-300 hover:border-eco-primary hover:text-eco-primary'
              }`}
            >
              About
            </Link>
            <Link
              to="/ngo"
              className={`px-4 py-2 rounded-full font-medium transition-all border-2 ${
                isActive('/ngo')
                  ? 'bg-lime-100 text-green-800 border-lime-300'
                  : 'text-gray-700 border-gray-300 hover:border-eco-primary hover:text-eco-primary'
              }`}
            >
              NGOs
            </Link>
            <Link
              to="/feedback"
              className={`px-4 py-2 rounded-full font-medium transition-all border-2 ${
                isActive('/feedback')
                  ? 'bg-lime-100 text-green-800 border-lime-300'
                  : 'text-gray-700 border-gray-300 hover:border-eco-primary hover:text-eco-primary'
              }`}
            >
              Feedback
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full font-medium transition-all border-2 text-gray-700 border-gray-300 hover:border-eco-primary hover:text-eco-primary"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`px-4 py-2 rounded-full font-medium transition-all border-2 ${
                  isActive('/login')
                    ? 'bg-lime-100 text-green-800 border-lime-300'
                    : 'text-gray-700 border-gray-300 hover:border-eco-primary hover:text-eco-primary'
                }`}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-eco-primary"
              aria-label="Toggle menu"
            >
              <span className="material-icons">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-eco-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-eco-primary transition-colors font-medium"
            >
              About
            </Link>
            <Link
              to="/ngo"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-eco-primary transition-colors font-medium"
            >
              NGOs
            </Link>
            <Link
              to="/feedback"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-eco-primary transition-colors font-medium"
            >
              Feedback
            </Link>
            
            {user ? (
              <>
                <div className="text-sm text-gray-600">
                  {user.displayName || user.email}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block text-gray-700 hover:text-eco-primary transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-eco-primary transition-colors font-medium"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

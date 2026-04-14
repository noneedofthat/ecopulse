import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Leaf, LogIn, UserCircle, LogOut } from 'lucide-react'
import useAuthStore from '@store/authStore'

const navLinks = [
  { to: '/',         label: 'Home',     exact: true },
  { to: '/aqi',      label: 'AQI' },
  { to: '/ngo',      label: 'NGO' },
  { to: '/about',    label: 'About' },
  { to: '/feedback', label: 'Feedback' },
]

export default function Navbar() {
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const location = useLocation()
  const { user, signOut } = useAuthStore()

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Shadow on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-shadow duration-300
        bg-forest-900 text-white
        ${scrolled ? 'shadow-nav' : ''}`}
      style={{ height: 'var(--nav-height)' }}
    >
      <div className="page-container h-full flex items-center justify-between gap-4">

        {/* ── Logo ─────────────────────────────────────── */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 group shrink-0"
          aria-label="EcoPulse Home"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-xl
                           bg-forest-700 group-hover:bg-forest-600 transition-colors duration-200">
            <Leaf size={20} className="text-forest-200 rotate-12" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            Eco<span className="text-forest-400">Pulse</span>
          </span>
        </NavLink>

        {/* ── Desktop Nav ──────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map(({ to, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                `nav-link px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                 ${isActive
                   ? 'bg-forest-700/60 text-white'
                   : 'text-forest-200 hover:bg-forest-800 hover:text-white'
                 }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* ── Auth Actions (Desktop) ───────────────────── */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-2 text-sm text-forest-200">
                <UserCircle size={18} className="text-forest-400" />
                <span className="max-w-[120px] truncate">{user.name || user.email}</span>
              </span>
              <button
                onClick={signOut}
                className="btn-ghost text-forest-200 hover:text-white hover:bg-forest-800 text-sm py-1.5"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          ) : (
            <NavLink to="/feedback" className="btn-secondary text-sm py-2 px-4">
              <LogIn size={15} />
              Sign in
            </NavLink>
          )}
        </div>

        {/* ── Hamburger (Mobile) ───────────────────────── */}
        <button
          className="md:hidden p-2 rounded-xl text-forest-200 hover:bg-forest-800
                     hover:text-white transition-colors duration-200"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile Drawer ────────────────────────────────── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
          bg-forest-900 border-t border-forest-800
          ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <nav className="page-container py-3 flex flex-col gap-1" aria-label="Mobile navigation">
          {navLinks.map(({ to, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                 ${isActive
                   ? 'bg-forest-700 text-white'
                   : 'text-forest-200 hover:bg-forest-800 hover:text-white'
                 }`
              }
            >
              {label}
            </NavLink>
          ))}

          <div className="mt-2 pt-3 border-t border-forest-800">
            {user ? (
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm text-forest-300 flex items-center gap-2">
                  <UserCircle size={16} />
                  {user.name || user.email}
                </span>
                <button
                  onClick={signOut}
                  className="text-sm text-forest-400 hover:text-white flex items-center gap-1"
                >
                  <LogOut size={14} /> Sign out
                </button>
              </div>
            ) : (
              <NavLink
                to="/feedback"
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium
                           bg-forest-700 text-white hover:bg-forest-600 transition-colors"
              >
                <LogIn size={15} /> Sign in to leave feedback
              </NavLink>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

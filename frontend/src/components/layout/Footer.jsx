import { NavLink } from 'react-router-dom'
import { Leaf, Github, Twitter, Mail, Heart } from 'lucide-react'

const footerLinks = {
  Explore: [
    { to: '/',         label: 'News Feed' },
    { to: '/aqi',      label: 'AQI Tracker' },
    { to: '/ngo',      label: 'NGO Directory' },
  ],
  Company: [
    { to: '/about',    label: 'About Us' },
    { to: '/feedback', label: 'Feedback' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-forest-200 mt-auto">

      {/* ── Main footer content ─────────────────────── */}
      <div className="page-container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <NavLink to="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-forest-700">
                <Leaf size={20} className="text-forest-200 rotate-12" />
              </span>
              <span className="font-display text-xl font-bold text-white">
                Eco<span className="text-forest-400">Pulse</span>
              </span>
            </NavLink>
            <p className="text-forest-300 text-sm leading-relaxed max-w-xs">
              Your pulse on the planet. Aggregating the world's most important
              environmental news, air quality data, and conservation resources.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Mail, href: '#', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg
                             bg-forest-800 text-forest-400 hover:bg-forest-700
                             hover:text-white transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className="text-forest-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────── */}
      <div className="border-t border-forest-800">
        <div className="page-container py-4 flex flex-col sm:flex-row items-center
                        justify-between gap-2 text-xs text-forest-500">
          <span>
            © {new Date().getFullYear()} EcoPulse. Built with{' '}
            <Heart size={11} className="inline text-forest-400 mx-0.5" fill="currentColor" />
            for the planet.
          </span>
          <span>Data from The Guardian · OpenWeatherMap · Gemini AI</span>
        </div>
      </div>
    </footer>
  )
}

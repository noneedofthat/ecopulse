/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // EcoPulse Earthy Green Design System
        forest: {
          950: '#0d1f17',
          900: '#1a3a2a',
          800: '#1e4d35',
          700: '#2d6a4f',
          600: '#3a7d5e',
          500: '#52b788',
          400: '#74c69d',
          300: '#95d5b2',
          200: '#b7e4c7',
          100: '#d8f3dc',
          50:  '#f0faf2',
        },
        earth: {
          900: '#3d2b1f',
          700: '#6b4226',
          500: '#a0522d',
          300: '#c8956c',
          100: '#f0dfd0',
        },
        bark: {
          900: '#2c2416',
          700: '#4a3f28',
          500: '#7a6642',
          300: '#b5a07a',
          100: '#ede0c8',
        },
        amber: {
          600: '#d97706',
          500: '#f59e0b',
          400: '#fbbf24',
          100: '#fef3c7',
        },
        // Semantic
        aqi: {
          good:      '#52b788',
          moderate:  '#fbbf24',
          unhealthy: '#f97316',
          hazardous: '#dc2626',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'card':     '0 2px 16px 0 rgba(26,58,42,0.08)',
        'card-hover': '0 8px 32px 0 rgba(26,58,42,0.16)',
        'nav':      '0 2px 24px 0 rgba(26,58,42,0.12)',
        'modal':    '0 24px 64px 0 rgba(26,58,42,0.24)',
      },
      borderRadius: {
        'xl':  '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      backgroundImage: {
        'hero-pattern':    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2352b788' fill-opacity='0.06'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'leaf-pattern':    "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 8 Q55 20 55 40 Q55 60 40 72 Q25 60 25 40 Q25 20 40 8Z' fill='%2352b788' fill-opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in':      'fadeIn 0.5s ease-out',
        'slide-down':   'slideDown 0.3s ease-out',
        'slide-up':     'slideUp 0.3s ease-out',
        'pulse-green':  'pulseGreen 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'float':        'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGreen: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}

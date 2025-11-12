/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode - Clean, calm, nature-inspired
        'eco-primary': '#34A853',
        'eco-accent': '#10B981',
        'eco-secondary': '#6B7280',
        'eco-light-bg': '#F9FAFB',
        'eco-light-surface': '#FFFFFF',
        'eco-text-primary': '#1F2937',
        'eco-text-secondary': '#6B7280',
        'eco-card-shadow': 'rgba(0,0,0,0.05)',
        'eco-link': '#10B981',
        'eco-btn': '#2E7D32',

        // Dark mode - Deep, modern, immersive
        'eco-primary-dark': '#34A853',
        'eco-accent-dark': '#4ADE80',
        'eco-secondary-dark': '#A1A1AA',
        'eco-dark-bg': '#121212',
        'eco-dark-surface': '#1E1E1E',
        'eco-text-primary-dark': '#EDEDED',
        'eco-text-secondary-dark': '#A1A1AA',
        'eco-card-shadow-dark': 'rgba(52,168,83,0.2)',
        'eco-link-dark': '#4ADE80',
        'eco-btn-dark': '#34A853',
      },
      fontFamily: {
        sans: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      backgroundImage: {
        'light-gradient': 'linear-gradient(to bottom, #F9FAFB 0%, #FFFFFF 100%)',
        'dark-gradient': 'linear-gradient(to bottom, #121212 0%, #1E1E1E 100%)',
      },
      boxShadow: {
        'eco-card': '0 2px 8px 0 rgba(0,0,0,0.05)',
        'eco-card-dark': '0 2px 8px 0 rgba(52,168,83,0.2)',
      },
      letterSpacing: {
        wider: '0.01em',
      },
    },
  },
  plugins: [],
}

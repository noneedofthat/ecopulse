# EcoPulse Setup Guide

## ✅ All 5 Improvements Implemented!

### 1. ✅ Category Filter Removed
- Removed category filtering (site shows all environmental news)
- Simplified news feed to focus on environment-only content

### 2. ✅ AI Summarize Button Added
- Each news card now has a "Summarize" button
- Uses Gemini AI to generate concise 2-3 sentence summaries
- Summary appears in a highlighted box above the article

### 3. ✅ Floating Gemini AI Chat
- Bottom-right floating chat icon
- Click to open AI assistant
- Ask questions about environment, climate, sustainability
- Powered by Google Gemini AI

### 4. ✅ NGO Page Added
- New "NGOs" tab in navigation (between About and Feedback)
- Lists 8 major environmental organizations
- Includes descriptions, focus areas, and website links
- Beautiful card-based layout

### 5. ✅ Dark/Light Mode
- Already implemented with theme toggle in header
- Persists preference to localStorage
- Smooth transitions between themes

## 🔑 Required API Keys

You need to add **ONE MORE** API key to your `.env` file:

### Get Gemini API Key:
1. Go to: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key
4. Add to your `.env` file:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## 🚀 Running the App

Once you have all API keys in `.env`:

```bash
cd ecopulse
npm run dev
```

The app will open at: http://localhost:5173

## 🎯 Features Overview

### News Feed
- Real-time environmental news
- AI-powered article summaries
- Infinite scroll
- Responsive cards

### AI Assistant
- Floating chat widget (bottom-right)
- Ask environmental questions
- Get eco-friendly tips
- Powered by Gemini AI

### NGO Directory
- 8 major environmental organizations
- Direct links to their websites
- Focus areas and descriptions

### Authentication
- Email/Password registration
- Google OAuth
- Protected feedback page

### Feedback System
- Star ratings (1-5)
- Comment submission
- Public feedback display

### Theme
- Dark/Light mode toggle
- Persists preference
- Smooth transitions

## 📝 Notes

- **Gemini API** is free with generous limits
- **NewsAPI** free tier: 100 requests/day
- **Firebase** free tier is sufficient for development

## 🐛 Troubleshooting

If you get errors:
1. Make sure all API keys are in `.env`
2. Restart dev server after adding keys
3. Check Firebase Authentication is enabled
4. Check Firestore database is created

## 🎨 Customization

All colors, fonts, and styles can be customized in:
- `tailwind.config.js` - Theme colors
- `src/styles/globals.css` - Global styles
- Component files - Individual styling

Enjoy building with EcoPulse! 🌱

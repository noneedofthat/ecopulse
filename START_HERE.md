# 🚀 Quick Start Guide

## ✅ You're Almost Ready!

Your `.env` file is configured with all the necessary API keys. Now just follow these steps:

### Step 1: Start the Development Server

```bash
cd ecopulse
npm run dev
```

The app will open at: **http://localhost:5173**

### Step 2: Test Each Feature

#### 🌓 Dark/Light Mode
1. Look for the moon/sun icon in the header (top-right)
2. Click it to toggle between themes
3. The entire page should change colors
4. Refresh - your preference should be saved

#### 📰 News Feed
1. Home page shows environmental news articles
2. Scroll down to load more (infinite scroll)
3. Each article has a card with image, title, description

#### 🤖 AI Summarization
1. Find any news article card
2. Click the "Summarize" button
3. Wait 2-3 seconds
4. AI-generated summary appears in a green box
5. Click "Hide Summary" to collapse it

#### 💬 AI Chat Assistant
1. Look for the floating robot icon (bottom-right corner)
2. Click it to open the chat window
3. Type a question like: "What can I do to reduce plastic waste?"
4. Press Enter or click Send
5. AI responds with helpful environmental advice

#### 🏢 NGO Directory
1. Click "NGOs" in the navigation menu
2. Browse 8 major environmental organizations
3. Click "Visit Website" to learn more about each

#### 📝 Feedback System
1. Click "Feedback" in navigation
2. Login if not already logged in
3. Rate your experience (1-5 stars)
4. Write a comment
5. Submit feedback

## 🔑 API Keys Status

Your `.env` file has:
- ✅ NewsAPI Key
- ✅ Firebase Configuration
- ✅ Gemini AI Key

All set! 🎉

## ⚠️ Important Notes

### If Something Doesn't Work:

1. **Restart the dev server** (Ctrl+C, then `npm run dev`)
2. **Clear browser cache** (Ctrl+Shift+R)
3. **Check browser console** (F12) for errors
4. **See TROUBLESHOOTING.md** for detailed fixes

### Common First-Time Issues:

**Theme not changing?**
- Hard refresh browser (Ctrl+Shift+R)
- Check console for errors
- Try in incognito mode

**Summarize not working?**
- Wait 2-3 seconds (AI takes time)
- Check console for API errors
- Verify Gemini API key is correct

**Chat not responding?**
- Same as summarize
- Check network tab for failed requests
- Gemini free tier: 60 requests/minute

**No news articles?**
- Check NewsAPI quota (100/day free)
- Verify API key is correct
- Check network tab

## 🎯 What to Expect

### Home Page
- Hero section with quote of the day
- "Take Action" tips (4 random eco-tips)
- News feed with environmental articles
- Infinite scroll for more articles

### Each News Card
- Article image
- Source name and publish date
- Title and description
- "Summarize" button (AI-powered)
- "Read More" link (opens original article)

### AI Chat
- Floating bot icon (always visible)
- Click to open chat window
- Ask environmental questions
- Get helpful, actionable advice

### NGO Page
- 8 environmental organizations
- Icons, descriptions, focus areas
- Direct links to their websites
- Call-to-action section

## 🐛 Quick Debug

If you see errors, check:

```bash
# 1. Console logs (F12 in browser)
# Look for red error messages

# 2. Network tab (F12 → Network)
# Check if API requests are failing

# 3. Restart dev server
npm run dev
```

## 📚 Documentation

- `README.md` - Project overview
- `SETUP_GUIDE.md` - Detailed setup instructions
- `TROUBLESHOOTING.md` - Fix common issues
- `.env.example` - Environment variables template

## 🎨 Customization

Want to change colors or styles?
- `tailwind.config.js` - Theme colors
- `src/styles/globals.css` - Global styles
- Component files - Individual styling

## 🚀 Ready to Go!

Just run:
```bash
npm run dev
```

And open: **http://localhost:5173**

Enjoy building with EcoPulse! 🌱

---

**Need help?** Check `TROUBLESHOOTING.md` or look at browser console for errors.

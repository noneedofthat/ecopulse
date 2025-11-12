# EcoPulse Troubleshooting Guide

## 🔧 Common Issues and Fixes

### 1. Dark/Light Mode Not Working

**Symptoms**: Theme toggle button doesn't change the theme

**Solutions**:

#### A. Check Browser Console
1. Open browser DevTools (F12)
2. Click the theme toggle button
3. Look for console logs showing theme changes
4. Check if `dark` class is being added to `<html>` element

#### B. Clear Browser Cache
```bash
# Hard refresh in browser
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

#### C. Check localStorage
1. Open DevTools → Application → Local Storage
2. Look for `ecopulse-theme` key
3. Delete it and refresh page
4. Try toggling theme again

#### D. Verify Tailwind Config
The `tailwind.config.js` should have:
```javascript
darkMode: 'class',
```

### 2. Gemini AI Summarization Not Working

**Symptoms**: "Summarize" button doesn't work or shows errors

**Solutions**:

#### A. Verify API Key
1. Check `.env` file has:
```env
VITE_GEMINI_API_KEY=your_actual_key_here
```

2. Get a new key if needed:
   - Go to: https://makersuite.google.com/app/apikey
   - Click "Create API Key"
   - Copy and paste into `.env`

#### B. Restart Dev Server
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

**Important**: Vite requires restart after changing `.env` files!

#### C. Check API Quota
- Gemini free tier: 60 requests/minute
- If exceeded, wait a minute and try again

#### D. Check Network Tab
1. Open DevTools → Network tab
2. Click "Summarize" button
3. Look for request to `generativelanguage.googleapis.com`
4. Check response for errors

### 3. Gemini Chat Widget Not Working

**Symptoms**: Chat widget doesn't respond or shows errors

**Solutions**:

#### A. Same as Summarization
- Verify API key
- Restart dev server
- Check quota

#### B. Check Console for Errors
Look for specific error messages:
- "API key not configured" → Add key to `.env`
- "API error: 429" → Rate limit exceeded, wait
- "API error: 400" → Invalid request format
- "API error: 403" → Invalid API key

### 4. News Feed Not Loading

**Symptoms**: No articles appear, loading spinner forever

**Solutions**:

#### A. Check NewsAPI Key
```env
VITE_NEWS_API_KEY=your_newsapi_key
```

#### B. Check NewsAPI Quota
- Free tier: 100 requests/day
- Check at: https://newsapi.org/account

#### C. Check Network
- Open DevTools → Network
- Look for requests to `newsapi.org`
- Check response status

### 5. Firebase Authentication Not Working

**Symptoms**: Can't login, register, or errors on auth pages

**Solutions**:

#### A. Verify Firebase Config
All these must be in `.env`:
```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

#### B. Enable Authentication Methods
1. Go to Firebase Console
2. Authentication → Sign-in method
3. Enable "Email/Password"
4. Enable "Google"

#### C. Check Firestore
1. Go to Firebase Console
2. Firestore Database
3. Create database if not exists
4. Start in test mode for development

## 🚀 Quick Fixes

### Complete Reset
```bash
# 1. Stop dev server (Ctrl+C)

# 2. Clear node modules and reinstall
rm -rf node_modules
npm install

# 3. Clear browser data
# - Clear cache
# - Clear localStorage
# - Clear cookies for localhost

# 4. Restart dev server
npm run dev
```

### Environment Variables Not Loading
```bash
# After changing .env, ALWAYS restart:
npm run dev
```

### Build Errors
```bash
# Clean build
rm -rf dist
npm run build
```

## 🐛 Debug Mode

### Enable Verbose Logging

Add to your component:
```javascript
useEffect(() => {
  console.log('Current theme:', theme);
  console.log('HTML classes:', document.documentElement.className);
}, [theme]);
```

### Check API Responses

In `geminiService.js`, add:
```javascript
console.log('API Response:', data);
```

## 📞 Still Having Issues?

1. **Check Browser Console** - Most errors show here
2. **Check Network Tab** - See failed requests
3. **Verify All API Keys** - Double-check `.env`
4. **Restart Everything** - Server, browser, clear cache
5. **Check API Quotas** - You might be rate-limited

## ✅ Verification Checklist

- [ ] All API keys in `.env` file
- [ ] Dev server restarted after `.env` changes
- [ ] Browser cache cleared
- [ ] Firebase Authentication enabled
- [ ] Firestore database created
- [ ] No console errors
- [ ] Network requests succeeding

## 🎯 Testing Each Feature

### Test Theme Toggle
1. Click theme button in header
2. Check console for logs
3. Verify background color changes
4. Refresh page - theme should persist

### Test Summarization
1. Find a news article
2. Click "Summarize" button
3. Wait 2-3 seconds
4. Summary should appear in green box

### Test Chat Widget
1. Click floating bot icon (bottom-right)
2. Type a message about environment
3. Press Enter or click Send
4. AI should respond in 2-5 seconds

### Test News Feed
1. Home page should show articles
2. Scroll down for infinite scroll
3. Articles should load automatically

## 💡 Pro Tips

1. **Always restart dev server after `.env` changes**
2. **Check console first** - errors are usually logged
3. **Use incognito mode** - eliminates cache issues
4. **Check API quotas** - free tiers have limits
5. **One issue at a time** - fix systematically

---

If you're still stuck, check the console logs and network tab - they usually tell you exactly what's wrong!

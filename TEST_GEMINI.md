# Gemini API 404 Error - Fix Guide

## Problem
Getting 404 error when calling Gemini API, even though API key is configured.

## Root Cause
Your Gemini API key might not be enabled for the Generative Language API.

## Solution

### Option 1: Enable Gemini API (Recommended)

1. **Go to Google AI Studio**:
   - Visit: https://makersuite.google.com/app/apikey

2. **Check Your API Key**:
   - Click on your existing API key
   - Make sure it says "Generative Language API" is enabled

3. **If Not Enabled**:
   - Delete the old key
   - Click "Create API Key"
   - Select your Google Cloud project (or create new)
   - The new key will have Gemini API enabled

4. **Update .env**:
   ```env
   VITE_GEMINI_API_KEY=your_new_key_here
   ```

5. **Restart Dev Server**:
   ```bash
   npm run dev
   ```

### Option 2: Use Alternative API Endpoint

If you want to test without fixing the API key, I can modify the code to use a mock response or different AI service.

## Quick Test

To test if your API key works, run this in your browser console:

```javascript
fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=YOUR_API_KEY', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{ parts: [{ text: 'Say hello' }] }]
  })
})
.then(r => r.json())
.then(d => console.log('Success:', d))
.catch(e => console.error('Error:', e));
```

Replace `YOUR_API_KEY` with your actual key.

## Expected Results

### ✅ Working API Key:
```json
{
  "candidates": [{
    "content": {
      "parts": [{ "text": "Hello! ..." }]
    }
  }]
}
```

### ❌ Invalid/Not Enabled:
```json
{
  "error": {
    "code": 404,
    "message": "models/gemini-pro not found"
  }
}
```

## Alternative: Disable Gemini Features Temporarily

If you want to use the app without Gemini AI:

1. **Comment out Gemini features** in NewsCard.jsx:
   - Hide the "Summarize" button
   - Or show a message "AI features coming soon"

2. **Hide Chat Widget** in App.jsx:
   - Comment out `<GeminiChat />`

Would you like me to:
1. Help you get a new API key?
2. Disable Gemini features temporarily?
3. Use a different AI service?

## Current Status

- ✅ Theme Toggle: **WORKING** (console shows it's toggling)
- ❌ Gemini Summarize: **404 Error** (API key issue)
- ❌ Gemini Chat: **404 Error** (same issue)
- ✅ News Feed: **WORKING**
- ✅ NGO Page: **WORKING**
- ✅ Everything else: **WORKING**

## Next Steps

1. Get a new Gemini API key from: https://makersuite.google.com/app/apikey
2. Make sure "Generative Language API" is enabled
3. Update `.env` file
4. Restart dev server
5. Test again

---

**Note**: The 404 error is NOT your fault - it's a common issue when the API key isn't properly enabled for the Gemini API service.

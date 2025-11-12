# News API Issue on Netlify

## The Problem

News API returns a **426 error** on deployed sites because:
- The **free tier of News API only works from localhost**
- It blocks requests from production domains (CORS restriction)
- This is a limitation of the free News API plan

## Solutions

### Option 1: Upgrade News API Plan (Paid)
- Upgrade to a paid News API plan at https://newsapi.org/pricing
- Paid plans allow production domain requests
- Cost: Starting at $449/month

### Option 2: Use Alternative Free News APIs

Here are some free alternatives that work in production:

#### A. NewsData.io (Recommended)
- Free tier: 200 requests/day
- Works in production
- Sign up: https://newsdata.io/
- Similar API structure to News API

#### B. GNews API
- Free tier: 100 requests/day
- Works in production
- Sign up: https://gnews.io/

#### C. The Guardian API
- Free tier: 5,000 requests/day
- Works in production
- Sign up: https://open-platform.theguardian.com/

#### D. New York Times API
- Free tier: 4,000 requests/day
- Works in production
- Sign up: https://developer.nytimes.com/

### Option 3: Create a Backend Proxy (Free but requires setup)

Create a simple backend service (Netlify Functions, Vercel, or Express) that:
1. Receives requests from your frontend
2. Makes the News API call from the server
3. Returns the data to your frontend

This works because News API allows server-side requests.

### Option 4: Use Mock/Static Data (Temporary)

For demonstration purposes, you can use static news data until you set up a proper solution.

## Recommended Quick Fix: Switch to NewsData.io

I can help you switch to NewsData.io which is free and works in production:

1. Sign up at https://newsdata.io/
2. Get your API key
3. I'll update the code to use NewsData.io instead
4. Add the new API key to Netlify environment variables

Would you like me to update the code to use NewsData.io?

---

## For Login Issues

The Cross-Origin-Opener-Policy errors are related to Firebase popup authentication. To fix:

1. **Add Netlify domain to Firebase** (as mentioned before)
2. **Add to Google Cloud Console** (for Google Sign-In):
   - Go to https://console.cloud.google.com/
   - Select your project
   - APIs & Services → Credentials
   - Edit your OAuth 2.0 Client ID
   - Add to "Authorized JavaScript origins":
     - `https://your-site-name.netlify.app`
   - Add to "Authorized redirect URIs":
     - `https://your-site-name.netlify.app/__/auth/handler`

---

## Current Status

✅ Logo is showing
❌ News API blocked (426 error) - Need alternative API
❌ Login needs Firebase domain authorization

Let me know which solution you'd like to pursue for the news!

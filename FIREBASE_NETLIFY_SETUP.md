# Firebase Configuration for Netlify Deployment

## Why Login and Features Aren't Working

Your app is deployed on Netlify, but Firebase doesn't recognize your Netlify domain yet. You need to add it to Firebase's authorized domains.

---

## Step-by-Step: Add Netlify Domain to Firebase

### Step 1: Get Your Netlify URL

1. Go to your Netlify dashboard
2. Find your site URL (e.g., `your-site-name.netlify.app`)
3. Copy the full URL

### Step 2: Add Domain to Firebase Authentication

1. **Go to Firebase Console**
   - Visit https://console.firebase.google.com/
   - Select your EcoPulse project

2. **Navigate to Authentication**
   - Click on "Authentication" in the left sidebar
   - Click on the "Settings" tab at the top
   - Scroll down to "Authorized domains"

3. **Add Your Netlify Domain**
   - Click "Add domain" button
   - Paste your Netlify URL (e.g., `your-site-name.netlify.app`)
   - **Important:** Only add the domain part, NOT the full URL
     - ✅ Correct: `your-site-name.netlify.app`
     - ❌ Wrong: `https://your-site-name.netlify.app`
   - Click "Add"

4. **Wait a Few Minutes**
   - Firebase needs a few minutes to propagate the changes
   - Usually takes 1-5 minutes

### Step 3: Verify Environment Variables in Netlify

Make sure all these environment variables are set in Netlify:

1. Go to your Netlify site dashboard
2. Site settings → Environment variables
3. Verify these 8 variables exist:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_NEWS_API_KEY`
   - `VITE_GEMINI_API_KEY`

### Step 4: Test Your Site

1. **Test Login:**
   - Go to your Netlify site
   - Try to register a new account
   - Try to login with email/password
   - Try "Continue with Google"

2. **Test News:**
   - Check if news articles are loading on the home page
   - If not, check the browser console (F12) for errors

3. **Test Other Features:**
   - Try the Gemini AI chat
   - Check if feedback form works
   - Verify all pages load correctly

---

## Troubleshooting

### News Not Showing

**Possible Causes:**
1. **News API Key not set or invalid**
   - Check if `VITE_NEWS_API_KEY` is in Netlify environment variables
   - Verify the API key is valid at https://newsapi.org/

2. **API Rate Limit**
   - Free News API has limited requests
   - Check browser console for error messages

3. **CORS Issues**
   - News API might have CORS restrictions
   - Check browser console for CORS errors

**How to Check:**
- Open browser console (F12)
- Look for red error messages
- Common errors:
  - `401 Unauthorized` = Invalid API key
  - `429 Too Many Requests` = Rate limit exceeded
  - `CORS error` = Cross-origin issue

### Login Not Working

**Possible Causes:**
1. **Netlify domain not added to Firebase**
   - Follow Step 2 above to add your domain

2. **Environment variables missing**
   - Verify all Firebase variables are set in Netlify

3. **Firebase configuration error**
   - Check browser console for Firebase errors

**How to Check:**
- Open browser console (F12)
- Try to login
- Look for error messages like:
  - `auth/unauthorized-domain` = Domain not authorized in Firebase
  - `Firebase: Error (auth/...)` = Configuration issue

### Google Sign-In Not Working

**Additional Steps for Google Auth:**

1. **Add Netlify domain to Google Cloud Console**
   - Go to https://console.cloud.google.com/
   - Select your project
   - Go to "APIs & Services" → "Credentials"
   - Click on your OAuth 2.0 Client ID
   - Under "Authorized JavaScript origins", add:
     - `https://your-site-name.netlify.app`
   - Under "Authorized redirect URIs", add:
     - `https://your-site-name.netlify.app/__/auth/handler`
   - Click "Save"

2. **Wait for changes to propagate** (5-10 minutes)

### Gemini AI Chat Not Working

**Check:**
1. `VITE_GEMINI_API_KEY` is set in Netlify
2. API key is valid at https://makersuite.google.com/app/apikey
3. Check browser console for API errors

---

## Quick Checklist

After deployment, verify:

- [ ] Netlify domain added to Firebase authorized domains
- [ ] All 8 environment variables set in Netlify
- [ ] Site redeployed after adding environment variables
- [ ] Waited 5 minutes for Firebase changes to propagate
- [ ] Tested login with email/password
- [ ] Tested Google sign-in
- [ ] News articles are loading
- [ ] Gemini AI chat is working
- [ ] No errors in browser console

---

## Common Error Messages and Solutions

### Error: "auth/unauthorized-domain"
**Solution:** Add your Netlify domain to Firebase authorized domains (Step 2)

### Error: "401 Unauthorized" (News API)
**Solution:** Check if `VITE_NEWS_API_KEY` is set correctly in Netlify

### Error: "Firebase: Error (auth/invalid-api-key)"
**Solution:** Verify `VITE_FIREBASE_API_KEY` is correct in Netlify

### Error: "Failed to fetch" or "Network error"
**Solution:** Check if all environment variables are set and redeploy

---

## Still Having Issues?

1. **Check Browser Console:**
   - Press F12 to open developer tools
   - Go to "Console" tab
   - Look for red error messages
   - Share the error message for specific help

2. **Check Netlify Deploy Logs:**
   - Go to Netlify dashboard → Deploys
   - Click on the latest deploy
   - Check for build errors

3. **Verify Environment Variables:**
   - Make sure they all start with `VITE_`
   - No extra spaces or quotes
   - Values match your `.env` file

---

## Need More Help?

- Firebase Auth Docs: https://firebase.google.com/docs/auth/web/start
- Netlify Environment Variables: https://docs.netlify.com/environment-variables/overview/
- News API Docs: https://newsapi.org/docs

---

**Your site should work perfectly after adding the Netlify domain to Firebase! 🚀**

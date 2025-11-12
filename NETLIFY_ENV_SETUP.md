# How to Add Environment Variables in Netlify Dashboard

## Step-by-Step Guide

### Step 1: Deploy Your Site First
1. Go to https://app.netlify.com/drop
2. Drag and drop your `dist` folder (after running `npm run build`)
3. Wait for the initial deployment to complete
4. Your site will be live but won't work properly yet (because environment variables are missing)

### Step 2: Access Your Site Settings
1. After deployment, you'll see your site dashboard
2. Click on **"Site settings"** button (usually in the top navigation)
   - OR click on your site name to go to the site overview, then click "Site settings"

### Step 3: Navigate to Environment Variables
1. In the left sidebar, look for **"Environment variables"** under the "Build & deploy" section
2. Click on **"Environment variables"**
   - You'll see a page titled "Environment variables" with an "Add a variable" button

### Step 4: Add Each Environment Variable

For each variable, you need to:

1. Click the **"Add a variable"** or **"Add variable"** button
2. You'll see two fields:
   - **Key**: Enter the variable name (e.g., `VITE_FIREBASE_API_KEY`)
   - **Value**: Enter the variable value (copy from your `.env` file)
3. Click **"Create variable"** or **"Save"**

### Step 5: Add All Required Variables

Add these 8 environment variables one by one:

#### Variable 1: Firebase API Key
- **Key**: `VITE_FIREBASE_API_KEY`
- **Value**: (Copy from your .env file)

#### Variable 2: Firebase Auth Domain
- **Key**: `VITE_FIREBASE_AUTH_DOMAIN`
- **Value**: (Copy from your .env file - usually ends with `.firebaseapp.com`)

#### Variable 3: Firebase Project ID
- **Key**: `VITE_FIREBASE_PROJECT_ID`
- **Value**: (Copy from your .env file)

#### Variable 4: Firebase Storage Bucket
- **Key**: `VITE_FIREBASE_STORAGE_BUCKET`
- **Value**: (Copy from your .env file - usually ends with `.appspot.com`)

#### Variable 5: Firebase Messaging Sender ID
- **Key**: `VITE_FIREBASE_MESSAGING_SENDER_ID`
- **Value**: (Copy from your .env file - usually a number)

#### Variable 6: Firebase App ID
- **Key**: `VITE_FIREBASE_APP_ID`
- **Value**: (Copy from your .env file - starts with `1:`)

#### Variable 7: News API Key
- **Key**: `VITE_NEWS_API_KEY`
- **Value**: (Copy from your .env file)

#### Variable 8: Gemini API Key
- **Key**: `VITE_GEMINI_API_KEY`
- **Value**: (Copy from your .env file)

### Step 6: Redeploy Your Site

After adding all environment variables, you need to redeploy. There are two ways:

#### Option A: Drag & Drop Again (Easiest)
1. Go back to your local project
2. Make sure you have the latest build: `npm run build`
3. Go to https://app.netlify.com/drop
4. Drag and drop your `dist` folder again
5. It will update your existing site with the environment variables

#### Option B: Use the Deploys Tab
1. Go to the **"Deploys"** tab in your site dashboard
2. Look for **"Trigger deploy"** button (top right)
   - If you don't see it, you might need to connect to Git first
3. OR simply scroll down and click **"Retry deploy"** on the latest deployment
4. Wait for the new deployment to complete (usually 1-2 minutes)

#### Option C: Clear Cache and Deploy
1. In the **"Deploys"** tab
2. Click the three dots (...) next to a deployment
3. Select **"Clear cache and retry deploy"**

### Step 7: Verify Your Deployment

1. Once deployment is complete, click on the site URL
2. Test your site:
   - Check if news articles load
   - Try logging in
   - Test the Gemini AI chat
   - Check if all features work

---

## Alternative Method: Using Netlify CLI

If you prefer using the command line:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link to your site (run this in your project directory)
netlify link

# Add environment variables
netlify env:set VITE_FIREBASE_API_KEY "your-value-here"
netlify env:set VITE_FIREBASE_AUTH_DOMAIN "your-value-here"
netlify env:set VITE_FIREBASE_PROJECT_ID "your-value-here"
netlify env:set VITE_FIREBASE_STORAGE_BUCKET "your-value-here"
netlify env:set VITE_FIREBASE_MESSAGING_SENDER_ID "your-value-here"
netlify env:set VITE_FIREBASE_APP_ID "your-value-here"
netlify env:set VITE_NEWS_API_KEY "your-value-here"
netlify env:set VITE_GEMINI_API_KEY "your-value-here"

# Deploy
netlify deploy --prod
```

---

## Quick Reference: Where to Find Your Values

Open your `.env` file in the `ecopulse` folder and copy the values:

```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_NEWS_API_KEY=abc123...
VITE_GEMINI_API_KEY=AIza...
```

---

## Important Notes

⚠️ **Security Tips:**
- Never commit your `.env` file to Git
- Never share your API keys publicly
- Environment variables in Netlify are secure and encrypted

⚠️ **Common Issues:**
- If variables don't work, make sure they start with `VITE_`
- Always redeploy after adding/changing variables
- Check for typos in variable names (they're case-sensitive)

⚠️ **After Deployment:**
- Add your Netlify URL to Firebase authorized domains
- Test all features thoroughly
- Monitor the browser console for any errors

---

## Visual Guide Summary

1. **Netlify Dashboard** → Click your site
2. **Site settings** → Left sidebar
3. **Environment variables** → Under "Build & deploy"
4. **Add variable** → Enter Key and Value
5. **Repeat** for all 8 variables
6. **Deploys tab** → Trigger deploy → Deploy site
7. **Test** your live site!

---

**Need Help?**
- Netlify Docs: https://docs.netlify.com/environment-variables/overview/
- If you get stuck, check the browser console for error messages
- Make sure all 8 variables are added correctly

Good luck! 🚀

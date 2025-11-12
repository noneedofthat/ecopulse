# The Guardian API Setup Guide

## What Changed

I've updated the code to use **The Guardian API** instead of News API because:
- ✅ Free tier: 5,000 requests per day
- ✅ Works in production (no localhost-only restriction)
- ✅ High-quality environmental news content
- ✅ No credit card required

## Step 1: Get Your Guardian API Key

1. **Go to The Guardian Open Platform:**
   - Visit: https://open-platform.theguardian.com/access/

2. **Register for an API Key:**
   - Click "Register for a developer key"
   - Fill in the form:
     - Your name
     - Your email
     - Reason for use: "Educational project - Environmental news aggregator"
   - Agree to terms
   - Click "Register"

3. **Check Your Email:**
   - You'll receive an email with your API key
   - Copy the API key (it looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

## Step 2: Update Environment Variables

### For Local Development:

1. Open your `.env` file in the `ecopulse` folder
2. Add or update this line:
   ```
   VITE_GUARDIAN_API_KEY=your-guardian-api-key-here
   ```
   OR you can reuse the existing variable:
   ```
   VITE_NEWS_API_KEY=your-guardian-api-key-here
   ```
   (The code will use either one)

### For Netlify Deployment:

1. Go to your Netlify site dashboard
2. Click "Site settings"
3. Click "Environment variables" in the left sidebar
4. Either:
   - **Add a new variable:**
     - Key: `VITE_GUARDIAN_API_KEY`
     - Value: Your Guardian API key
   - **OR update the existing one:**
     - Find `VITE_NEWS_API_KEY`
     - Click "Edit"
     - Replace the value with your Guardian API key

## Step 3: Rebuild and Redeploy

1. **Rebuild your app:**
   ```bash
   cd ecopulse
   npm run build
   ```

2. **Redeploy to Netlify:**
   - Go to https://app.netlify.com/drop
   - Drag and drop your `dist` folder

3. **Wait for deployment** (1-2 minutes)

4. **Test your site!**

## What's Different?

The code now:
- Uses The Guardian API instead of News API
- Automatically transforms Guardian's response format to match our app
- Still caches results for better performance
- Still supports all the same categories

## Testing

After deployment, you should see:
- ✅ News articles loading on the home page
- ✅ All categories working (Climate, Energy, Conservation, etc.)
- ✅ Search functionality working
- ✅ Article images and descriptions

## Troubleshooting

### No articles showing?
- Check browser console (F12) for errors
- Verify the API key is set in Netlify environment variables
- Make sure you redeployed after adding the key

### "API request failed" error?
- Check if your API key is correct
- Verify you copied the entire key (including dashes)
- Make sure there are no extra spaces

### Images not showing?
- Some Guardian articles may not have images
- This is normal - the app will show a placeholder

## API Limits

The Guardian API free tier:
- **5,000 requests per day**
- **12 requests per second**
- More than enough for your app!

## Benefits of Guardian API

- ✅ High-quality journalism
- ✅ Excellent environmental coverage
- ✅ Works in production
- ✅ Free and reliable
- ✅ No credit card required
- ✅ Great for educational projects

---

**Your news should work perfectly now! 🎉**

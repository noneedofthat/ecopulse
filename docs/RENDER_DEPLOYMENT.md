# EcoPulse Deployment Guide - Render

Complete guide to deploy EcoPulse on Render (free tier available).

## Overview

- **Backend**: Node.js Web Service on Render
- **Frontend**: Static Site on Render
- **Database**: Supabase (already configured)
- **Cost**: FREE (with limitations)

## Prerequisites

1. GitHub account with EcoPulse repository
2. Render account (sign up at https://render.com)
3. All API keys ready:
   - Guardian API key
   - Google Gemini API key
   - OpenWeatherMap API key
   - Supabase URL and keys
   - Google OAuth credentials (optional)

---

## Part 1: Deploy Backend (Web Service)

### Step 1: Create Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the **ecopulse** repository

### Step 2: Configure Web Service

Fill in these settings:

```
Name: ecopulse-backend
Region: Choose closest to you (e.g., Oregon, Frankfurt, Singapore)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

### Step 3: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add these:

```
NODE_ENV=production
PORT=4000

# CORS - Will update after frontend deployment
CLIENT_URL=https://your-frontend-url.onrender.com

# JWT
JWT_SECRET=your_long_random_secret_string_here_min_32_chars
JWT_EXPIRES_IN=7d

# The Guardian API
GUARDIAN_API_KEY=your_guardian_api_key

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# OpenWeatherMap
OPENWEATHER_API_KEY=your_openweather_api_key

# Supabase
SUPABASE_URL=https://pecxeevgrbhpovlkfqig.supabase.co
SUPABASE_SERVICE_KEY=your_supabase_service_role_key

# Google OAuth (Optional - if using Google Sign-in)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-backend-url.onrender.com/api/auth/google/callback
```

### Step 4: Deploy Backend

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Note your backend URL: `https://ecopulse-backend.onrender.com`

### Step 5: Test Backend

Visit: `https://ecopulse-backend.onrender.com/api/health`

You should see:
```json
{
  "status": "ok",
  "service": "EcoPulse API",
  "timestamp": "2026-04-18T..."
}
```

---

## Part 2: Deploy Frontend (Static Site)

### Step 1: Create Static Site

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub repository
4. Select the **ecopulse** repository

### Step 2: Configure Static Site

Fill in these settings:

```
Name: ecopulse-frontend
Region: Same as backend
Branch: main
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: dist
```

### Step 3: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**:

```
# Backend API URL (use your actual backend URL from Part 1)
VITE_API_URL=https://ecopulse-backend.onrender.com

# Supabase
VITE_SUPABASE_URL=https://pecxeevgrbhpovlkfqig.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_u9ounbF_idni4sNa8LGQ8Q_7OMc4Bov
```

### Step 4: Deploy Frontend

1. Click **"Create Static Site"**
2. Wait for deployment (5-10 minutes)
3. Note your frontend URL: `https://ecopulse-frontend.onrender.com`

---

## Part 3: Update Backend CORS

### Step 1: Update CLIENT_URL

1. Go to your backend service in Render dashboard
2. Click **"Environment"** tab
3. Update `CLIENT_URL` to your frontend URL:
   ```
   CLIENT_URL=https://ecopulse-frontend.onrender.com
   ```
4. Click **"Save Changes"**
5. Backend will automatically redeploy

---

## Part 4: Configure Google OAuth (Optional)

If using Google Sign-in:

### Step 1: Update Google Cloud Console

1. Go to https://console.cloud.google.com/apis/credentials
2. Edit your OAuth 2.0 Client ID
3. Add to **Authorized JavaScript origins**:
   ```
   https://ecopulse-frontend.onrender.com
   ```
4. Add to **Authorized redirect URIs**:
   ```
   https://ecopulse-backend.onrender.com/api/auth/google/callback
   ```
5. Save changes

### Step 2: Update Supabase

1. Go to Supabase dashboard → Authentication → URL Configuration
2. Update **Site URL**: `https://ecopulse-frontend.onrender.com`
3. Add to **Redirect URLs**:
   ```
   https://ecopulse-frontend.onrender.com/*
   https://ecopulse-frontend.onrender.com/auth/callback
   ```

---

## Part 5: Test Your Deployment

### Backend Tests

1. Health check: `https://ecopulse-backend.onrender.com/api/health`
2. News API: `https://ecopulse-backend.onrender.com/api/news?page=1`
3. AQI API: `https://ecopulse-backend.onrender.com/api/aqi/current?lat=40.7128&lon=-74.0060`

### Frontend Tests

1. Visit: `https://ecopulse-frontend.onrender.com`
2. Test news feed loading
3. Test search functionality
4. Test AQI page
5. Test chatbot
6. Test Google sign-in (if configured)

---

## Important Notes

### Free Tier Limitations

- **Backend**: Spins down after 15 minutes of inactivity
- **First request**: May take 30-60 seconds (cold start)
- **Build minutes**: 500 minutes/month
- **Bandwidth**: 100 GB/month

### Cold Start Mitigation

Option 1: Use a service like UptimeRobot to ping your backend every 14 minutes
Option 2: Upgrade to paid plan ($7/month) for always-on service

### Custom Domain (Optional)

1. Go to your static site settings
2. Click **"Custom Domain"**
3. Add your domain and follow DNS instructions

---

## Troubleshooting

### Backend won't start

1. Check logs in Render dashboard
2. Verify all environment variables are set
3. Check `package.json` has correct start script

### Frontend shows API errors

1. Verify `VITE_API_URL` is correct
2. Check backend is running
3. Verify CORS settings in backend

### Google OAuth not working

1. Check redirect URIs in Google Console
2. Verify `GOOGLE_CALLBACK_URL` in backend env
3. Check Supabase redirect URLs

### Build fails

1. Check build logs in Render dashboard
2. Verify `package.json` dependencies
3. Try building locally first: `npm run build`

---

## Monitoring

### View Logs

1. Go to Render dashboard
2. Select your service
3. Click **"Logs"** tab
4. View real-time logs

### Metrics

1. Click **"Metrics"** tab
2. View CPU, memory, bandwidth usage

---

## Updating Your App

### Automatic Deploys

Render automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

### Manual Deploy

1. Go to Render dashboard
2. Select your service
3. Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## Cost Optimization

### Free Tier Strategy

1. Use Render free tier for backend and frontend
2. Use Supabase free tier for database
3. Use free API tiers:
   - Guardian: 5,000 requests/day
   - Gemini: 15 requests/minute
   - OpenWeatherMap: 1,000 requests/day

### Upgrade Path

If you need more:
- **Starter Plan**: $7/month (always-on, no cold starts)
- **Standard Plan**: $25/month (more resources)

---

## Alternative: Render Blueprint (Advanced)

For one-click deployment, you can use a `render.yaml` file (see `render.yaml` in project root).

---

## Support

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- EcoPulse Issues: https://github.com/yourusername/ecopulse/issues

---

## Summary

Your EcoPulse app is now live on Render! 🎉

- **Frontend**: https://ecopulse-frontend.onrender.com
- **Backend**: https://ecopulse-backend.onrender.com
- **Database**: Supabase (already configured)

Total cost: **FREE** (with cold start limitations)

Enjoy your deployed app!

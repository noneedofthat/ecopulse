# Deploy Backend Only to Render

Quick guide for deploying only the EcoPulse backend to Render (frontend stays on Vercel).

## Overview

- **Frontend**: Already on Vercel ✅
- **Backend**: Deploy to Render (this guide)
- **Time**: ~10 minutes

---

## Step 1: Deploy Backend to Render

### 1.1 Create Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the **ecopulse** repository

### 1.2 Configure Service

Fill in these settings:

```
Name: ecopulse-backend
Region: Choose closest to you (Oregon, Frankfurt, Singapore)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

### 1.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

```env
NODE_ENV=production
PORT=4000

# CORS - Your Vercel frontend URL
CLIENT_URL=https://ecopulse-frontend-cqtc.vercel.app

# JWT
JWT_SECRET=your_long_random_secret_string_min_32_chars
JWT_EXPIRES_IN=7d

# The Guardian API
GUARDIAN_API_KEY=your_guardian_api_key

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# OpenWeatherMap
OPENWEATHER_API_KEY=your_openweather_api_key

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_supabase_service_role_key

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-backend-url.onrender.com/api/auth/google/callback
```

**Important:** Set `CLIENT_URL` to your actual Vercel URL!

### 1.4 Deploy

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Copy your backend URL: `https://ecopulse-backend-xxxx.onrender.com`

### 1.5 Test Backend

Visit: `https://ecopulse-backend-xxxx.onrender.com/api/health`

Should return:
```json
{
  "status": "ok",
  "service": "EcoPulse API",
  "timestamp": "2026-04-18T..."
}
```

---

## Step 2: Update Vercel Frontend

### 2.1 Update Environment Variable

1. Go to Vercel dashboard
2. Select your **ecopulse-frontend** project
3. Go to **Settings** → **Environment Variables**
4. Update or add `VITE_API_URL`:

```
VITE_API_URL=https://ecopulse-backend-xxxx.onrender.com
```

(Replace `xxxx` with your actual Render backend URL)

### 2.2 Redeploy Frontend

Option A - Automatic:
```bash
git commit --allow-empty -m "Update backend URL"
git push origin main
```

Option B - Manual:
1. Go to Vercel dashboard
2. Click **"Deployments"** tab
3. Click **"..."** on latest deployment
4. Click **"Redeploy"**

Wait 2-3 minutes for redeployment.

---

## Step 3: Update External Services

### 3.1 Update Google OAuth (if using)

1. Go to https://console.cloud.google.com/apis/credentials
2. Edit your OAuth 2.0 Client ID
3. Update **Authorized redirect URIs**:
   - Add: `https://ecopulse-backend-xxxx.onrender.com/api/auth/google/callback`
4. Keep existing Vercel URLs
5. Save

### 3.2 Update Supabase (if needed)

1. Go to Supabase dashboard
2. Authentication → URL Configuration
3. Verify **Site URL** is your Vercel URL
4. Verify **Redirect URLs** include your Vercel URL

---

## Step 4: Test Everything

### Backend Tests

- [ ] Health: `https://ecopulse-backend-xxxx.onrender.com/api/health`
- [ ] News: `https://ecopulse-backend-xxxx.onrender.com/api/news?page=1`
- [ ] AQI: `https://ecopulse-backend-xxxx.onrender.com/api/aqi/current?lat=40.7128&lon=-74.0060`

### Frontend Tests

Visit your Vercel URL: `https://ecopulse-frontend-cqtc.vercel.app`

- [ ] Homepage loads
- [ ] News feed displays
- [ ] Search works
- [ ] AQI page works
- [ ] Chatbot responds
- [ ] Google sign-in works
- [ ] Feedback submission works

---

## Step 5: Prevent Cold Starts (Optional)

### Option 1: UptimeRobot (Recommended)

1. Sign up at https://uptimerobot.com (free)
2. Add new monitor:
   - Type: HTTP(s)
   - URL: `https://ecopulse-backend-xxxx.onrender.com/api/health`
   - Monitoring Interval: 14 minutes
3. Save

This keeps your backend warm and prevents 30-60s cold starts.

### Option 2: GitHub Actions

Create `.github/workflows/keep-alive.yml`:

```yaml
name: Keep Backend Alive
on:
  schedule:
    - cron: '*/14 * * * *'  # Every 14 minutes
jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping backend
        run: curl https://ecopulse-backend-xxxx.onrender.com/api/health
```

### Option 3: Upgrade to Paid ($7/month)

Upgrade backend to Render Starter plan for no cold starts.

---

## Architecture Overview

```
┌─────────────────┐
│  Vercel         │
│  (Frontend)     │ ← User visits
│  React + Vite   │
└────────┬────────┘
         │
         │ API calls
         ▼
┌─────────────────┐
│  Render         │
│  (Backend)      │
│  Node + Express │
└────────┬────────┘
         │
         │ Data
         ▼
┌─────────────────┐
│  Supabase       │
│  (Database)     │
└─────────────────┘
```

---

## Environment Variables Summary

### Backend (Render)
```env
NODE_ENV=production
PORT=4000
CLIENT_URL=https://ecopulse-frontend-cqtc.vercel.app
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
GUARDIAN_API_KEY=your_key
GEMINI_API_KEY=your_key
OPENWEATHER_API_KEY=your_openweather_api_key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
```

### Frontend (Vercel)
```env
VITE_API_URL=https://ecopulse-backend-xxxx.onrender.com
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Cost Breakdown

| Service | Platform | Cost |
|---------|----------|------|
| Frontend | Vercel | FREE |
| Backend | Render (Free) | FREE |
| Backend | Render (Starter) | $7/month |
| Database | Supabase | FREE |
| **Total** | | **FREE** or **$7/month** |

---

## Troubleshooting

### Backend won't start
- Check logs in Render dashboard
- Verify all environment variables are set
- Check `CLIENT_URL` matches Vercel URL

### Frontend shows CORS errors
- Verify `CLIENT_URL` in backend matches Vercel URL exactly
- Check for trailing slashes (should not have one)
- Check Render logs for CORS errors

### API calls fail
- Verify `VITE_API_URL` in Vercel is correct
- Check backend is running (visit `/api/health`)
- Check browser console for errors

### Cold starts too slow
- Set up UptimeRobot (free)
- Or upgrade to Render Starter ($7/month)

---

## Monitoring

### View Backend Logs

1. Go to Render dashboard
2. Select **ecopulse-backend**
3. Click **"Logs"** tab
4. View real-time logs

### View Backend Metrics

1. Click **"Metrics"** tab
2. View CPU, memory, bandwidth

---

## Updating Your App

### Backend Updates

Push to GitHub:
```bash
git add .
git commit -m "Update backend"
git push origin main
```

Render automatically redeploys.

### Frontend Updates

Push to GitHub:
```bash
git add .
git commit -m "Update frontend"
git push origin main
```

Vercel automatically redeploys.

---

## Rollback Plan

If something goes wrong:

1. **Backend:** Render has deployment history - rollback in dashboard
2. **Frontend:** Vercel has deployment history - rollback in dashboard
3. **Railway:** Keep running for 24-48 hours as safety net

---

## Success Checklist

- [ ] Backend deployed to Render
- [ ] Backend health check passes
- [ ] Vercel frontend updated with new backend URL
- [ ] Frontend redeploys successfully
- [ ] All pages load correctly
- [ ] All features work
- [ ] No CORS errors
- [ ] No console errors
- [ ] UptimeRobot configured (optional)

---

## Next Steps

1. **Today:**
   - Deploy backend to Render
   - Update Vercel environment variable
   - Test everything

2. **This Week:**
   - Monitor performance
   - Set up UptimeRobot
   - Keep Railway running (safety)

3. **Next Week:**
   - Delete Railway backend
   - Cancel Railway subscription
   - Save money! 🎉

---

## Summary

**What you're doing:**
- ✅ Frontend: Stays on Vercel (no changes needed)
- ✅ Backend: Move from Railway to Render
- ✅ Database: Stays on Supabase (no changes needed)

**Time:** ~10 minutes  
**Cost:** FREE (or $7/month for no cold starts)  
**Risk:** Low (Railway still running)

---

**You're all set!** 🚀

Your backend will be on Render, frontend on Vercel, and database on Supabase.

Total cost: **FREE** (with cold starts) or **$7/month** (no cold starts)

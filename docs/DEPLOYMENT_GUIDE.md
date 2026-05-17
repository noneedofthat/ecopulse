# EcoPulse Deployment Guide

## Prerequisites
- GitHub account with your code pushed
- Vercel account (free tier available)
- Railway account (free tier available)
- Supabase project already set up

---

## Part 1: Deploy Backend to Railway

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"

### Step 2: Deploy from GitHub
1. Select "Deploy from GitHub repo"
2. Choose your repository: `noneedofthat/ecopulse`
3. Railway will detect it's a Node.js project

### Step 3: Configure Environment Variables
1. Go to your project → Variables tab
2. Add all these variables (copy from `backend/.env.production`):

```
PORT=4000
NODE_ENV=production
CLIENT_URL=https://your-app.vercel.app
JWT_SECRET=your_production_jwt_secret_here
JWT_EXPIRES_IN=7d
GUARDIAN_API_KEY=your_guardian_api_key
GEMINI_API_KEY=your_gemini_api_key
OPENWEATHER_API_KEY=your_openweather_api_key
AQICN_API_KEY=your_aqicn_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

**Note**: Copy the actual values from your `backend/.env` file.

**Important**: Generate a strong JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 4: Configure Build Settings
1. Go to Settings → Build
2. Set Root Directory: `backend`
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`

### Step 5: Generate Domain
1. Go to Settings → Networking
2. Click "Generate Domain"
3. Copy your Railway URL (e.g., `https://ecopulse-production.up.railway.app`)
4. Save this URL - you'll need it for frontend deployment

### Step 6: Test Backend
Visit: `https://your-railway-url.railway.app/api/health`

You should see:
```json
{
  "status": "ok",
  "service": "EcoPulse API",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New" → "Project"

### Step 2: Import Repository
1. Select your repository: `noneedofthat/ecopulse`
2. Vercel will auto-detect it's a Vite project

### Step 3: Configure Build Settings
1. Framework Preset: Vite
2. Root Directory: `frontend`
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Install Command: `npm install`

### Step 4: Add Environment Variables
Click "Environment Variables" and add:

```
VITE_API_URL=https://your-railway-url.railway.app/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Note**: Copy the actual values from your `frontend/.env.local` file.

**Replace** `your-railway-url.railway.app` with your actual Railway URL from Part 1, Step 5.

### Step 5: Deploy
1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. Copy your Vercel URL (e.g., `https://ecopulse.vercel.app`)

---

## Part 3: Update Configuration

### Step 1: Update Railway CLIENT_URL
1. Go back to Railway dashboard
2. Go to Variables tab
3. Update `CLIENT_URL` to your Vercel URL: `https://ecopulse.vercel.app`
4. Railway will automatically redeploy

### Step 2: Update Supabase Redirect URLs
1. Go to Supabase dashboard
2. Navigate to Authentication → URL Configuration
3. Add these URLs:
   - Site URL: `https://ecopulse.vercel.app`
   - Redirect URLs:
     - `https://ecopulse.vercel.app`
     - `https://ecopulse.vercel.app/feedback`
     - `http://localhost:5173` (for local development)

### Step 3: Update Frontend API Client
The frontend should already be configured to use `VITE_API_URL` from environment variables. Verify in `frontend/src/utils/apiClient.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
```

---

## Part 4: Verify Deployment

### Test Backend Endpoints
1. Health Check: `https://your-railway-url.railway.app/api/health`
2. News: `https://your-railway-url.railway.app/api/news?page=1`

### Test Frontend
1. Visit your Vercel URL: `https://ecopulse.vercel.app`
2. Test all features:
   - ✅ News feed loads
   - ✅ Search and filters work
   - ✅ AI summary works
   - ✅ AQI page loads with map
   - ✅ NGO page displays cards
   - ✅ Chatbot responds
   - ✅ Google sign-in works
   - ✅ Feedback submission works

---

## Troubleshooting

### Backend Issues

**"Cannot GET /"**
- This is normal. Backend has no root route. Test `/api/health` instead.

**CORS Errors**
- Verify `CLIENT_URL` in Railway matches your Vercel URL exactly
- Check Railway logs: Settings → Logs

**API Key Errors**
- Verify all environment variables are set in Railway
- Check for typos in variable names

### Frontend Issues

**"Network Error" or API calls fail**
- Verify `VITE_API_URL` is set correctly in Vercel
- Check Railway backend is running
- Open browser console for detailed errors

**Google Sign-in Fails**
- Verify Supabase redirect URLs include your Vercel domain
- Check Supabase logs: Authentication → Logs

**Build Fails**
- Check Vercel build logs
- Verify `frontend` is set as root directory
- Ensure all dependencies are in `package.json`

### Force Redeploy

**Railway:**
- Go to Deployments → Click "Redeploy"

**Vercel:**
- Go to Deployments → Click "..." → "Redeploy"

---

## Cost Estimates

### Free Tier Limits

**Railway:**
- $5 free credit per month
- ~500 hours of runtime
- Sufficient for development/testing

**Vercel:**
- 100 GB bandwidth per month
- Unlimited deployments
- Free for personal projects

**Supabase:**
- 500 MB database
- 50,000 monthly active users
- 2 GB file storage

### Upgrade Needed When:
- Railway: >500 hours/month or need more resources
- Vercel: >100 GB bandwidth/month
- Supabase: >500 MB database or >50K users

---

## Production Checklist

- [ ] Backend deployed to Railway
- [ ] Frontend deployed to Vercel
- [ ] All environment variables configured
- [ ] Supabase redirect URLs updated
- [ ] Health check endpoint working
- [ ] News feed loading
- [ ] AQI map working
- [ ] AI features working (summary + chatbot)
- [ ] Google authentication working
- [ ] Feedback submission working
- [ ] Mobile responsive
- [ ] HTTPS enabled (automatic on both platforms)

---

## Monitoring

### Railway
- View logs: Settings → Logs
- Monitor usage: Settings → Usage
- Set up alerts: Settings → Notifications

### Vercel
- View analytics: Analytics tab
- Monitor performance: Speed Insights
- Check logs: Deployments → View Function Logs

### Supabase
- Monitor auth: Authentication → Users
- Check database: Database → Tables
- View logs: Logs & Analytics

---

## Continuous Deployment

Both Railway and Vercel automatically redeploy when you push to GitHub:

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. Railway and Vercel will automatically detect and deploy

---

## Support

- Railway: https://railway.app/help
- Vercel: https://vercel.com/support
- Supabase: https://supabase.com/docs

---

**Your EcoPulse app is now live! 🌍**

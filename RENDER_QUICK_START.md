# Render Quick Start - EcoPulse

Fast deployment guide for migrating from Railway to Render.

## 🚀 Quick Deploy (5 minutes)

### Step 1: Push to GitHub

Make sure your code is on GitHub:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### Step 2: Deploy Backend

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub and select your repo
4. Configure:
   - **Name**: `ecopulse-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables (click "Advanced"):
   ```
   NODE_ENV=production
   PORT=4000
   CLIENT_URL=https://your-frontend-url.onrender.com
   JWT_SECRET=your_secret_here_min_32_chars
   JWT_EXPIRES_IN=7d
   GUARDIAN_API_KEY=your_key
   GEMINI_API_KEY=your_key
   OPENWEATHER_API_KEY=your_key
   SUPABASE_URL=https://pecxeevgrbhpovlkfqig.supabase.co
   SUPABASE_SERVICE_KEY=your_key
   ```

6. Click **"Create Web Service"**
7. Wait 5-10 minutes
8. Copy your backend URL: `https://ecopulse-backend-xxxx.onrender.com`

### Step 3: Deploy Frontend

1. Click **"New +"** → **"Static Site"**
2. Select your repo
3. Configure:
   - **Name**: `ecopulse-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. Add Environment Variables:
   ```
   VITE_API_URL=https://ecopulse-backend-xxxx.onrender.com
   VITE_SUPABASE_URL=https://pecxeevgrbhpovlkfqig.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_u9ounbF_idni4sNa8LGQ8Q_7OMc4Bov
   ```

5. Click **"Create Static Site"**
6. Wait 5-10 minutes
7. Copy your frontend URL: `https://ecopulse-frontend-xxxx.onrender.com`

### Step 4: Update Backend CORS

1. Go to backend service → **Environment**
2. Update `CLIENT_URL` to your frontend URL
3. Save (auto-redeploys)

### Step 5: Test

Visit your frontend URL and test:
- ✅ News feed loads
- ✅ Search works
- ✅ AQI page works
- ✅ Chatbot responds
- ✅ Google sign-in works

---

## 📋 Environment Variables Checklist

### Backend (Required)
- [x] NODE_ENV
- [x] PORT
- [x] CLIENT_URL
- [x] JWT_SECRET
- [x] GUARDIAN_API_KEY
- [x] GEMINI_API_KEY
- [x] OPENWEATHER_API_KEY
- [x] SUPABASE_URL
- [x] SUPABASE_SERVICE_KEY

### Frontend (Required)
- [x] VITE_API_URL
- [x] VITE_SUPABASE_URL
- [x] VITE_SUPABASE_ANON_KEY

---

## ⚠️ Important Notes

### Free Tier Limitations
- Backend spins down after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- 500 build minutes/month
- 100 GB bandwidth/month

### Cold Start Solution
Use UptimeRobot (free) to ping your backend every 14 minutes:
1. Sign up at https://uptimerobot.com
2. Add monitor: `https://ecopulse-backend-xxxx.onrender.com/api/health`
3. Set interval: 14 minutes

### Your API Keys

Make sure you have these ready:

1. **Guardian API**: https://open-platform.theguardian.com/access/
2. **Gemini API**: https://aistudio.google.com/app/apikey
3. **OpenWeatherMap**: https://openweathermap.org/api
4. **Supabase**: Already configured
5. **Google OAuth** (optional): https://console.cloud.google.com

---

## 🔧 Troubleshooting

### Backend won't start
- Check logs in Render dashboard
- Verify all env vars are set
- Test locally: `cd backend && npm start`

### Frontend shows errors
- Verify `VITE_API_URL` is correct
- Check backend is running (visit `/api/health`)
- Check browser console for errors

### API calls fail
- Check CORS: `CLIENT_URL` must match frontend URL
- Verify backend env vars
- Check API keys are valid

---

## 🎯 Next Steps

1. **Custom Domain**: Add your own domain in Render settings
2. **Monitoring**: Set up UptimeRobot for uptime monitoring
3. **Analytics**: Add Google Analytics or Plausible
4. **Upgrade**: Consider paid plan ($7/month) for no cold starts

---

## 📚 Full Documentation

See `RENDER_DEPLOYMENT.md` for complete guide with:
- Detailed configuration
- Google OAuth setup
- Supabase configuration
- Troubleshooting
- Monitoring
- Cost optimization

---

## 💰 Cost Comparison

| Service | Railway (Trial) | Render (Free) | Render (Paid) |
|---------|----------------|---------------|---------------|
| Backend | $5/month | FREE | $7/month |
| Frontend | $5/month | FREE | FREE |
| Cold Starts | No | Yes | No |
| Build Minutes | 500 | 500 | 500 |
| **Total** | **$10/month** | **FREE** | **$7/month** |

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed on Render
- [ ] Frontend deployed on Render
- [ ] Backend URL updated in frontend env
- [ ] Frontend URL updated in backend CORS
- [ ] All API keys added
- [ ] Health check passes
- [ ] News feed works
- [ ] AQI page works
- [ ] Chatbot works
- [ ] Google sign-in works (if using)
- [ ] UptimeRobot configured (optional)

---

**You're all set! 🎉**

Your EcoPulse app is now running on Render for FREE!

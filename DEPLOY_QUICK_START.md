# Quick Deployment Steps

## 1. Deploy Backend to Railway (5 minutes)

1. Go to https://railway.app → Sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `noneedofthat/ecopulse`
4. Go to Settings → Variables → Add all from `backend/.env.production`
5. Go to Settings → Build:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Go to Settings → Networking → Generate Domain
7. Copy your Railway URL (e.g., `https://ecopulse-production.up.railway.app`)

**Test**: Visit `https://your-railway-url/api/health`

---

## 2. Deploy Frontend to Vercel (5 minutes)

1. Go to https://vercel.com → Sign in with GitHub
2. Click "Add New" → "Project"
3. Select `noneedofthat/ecopulse`
4. Configure:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variables:
   ```
   VITE_API_URL=https://your-railway-url.railway.app/api
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
6. Click "Deploy"
7. Copy your Vercel URL (e.g., `https://ecopulse.vercel.app`)

---

## 3. Update Configuration (2 minutes)

### Update Railway
1. Go to Railway → Variables
2. Update `CLIENT_URL` to your Vercel URL
3. Railway will auto-redeploy

### Update Supabase
1. Go to Supabase → Authentication → URL Configuration
2. Add Site URL: `https://ecopulse.vercel.app`
3. Add Redirect URLs:
   - `https://ecopulse.vercel.app`
   - `https://ecopulse.vercel.app/feedback`

---

## 4. Test Everything (3 minutes)

Visit your Vercel URL and test:
- ✅ News feed loads
- ✅ AI summary works
- ✅ AQI map works
- ✅ NGO page loads
- ✅ Chatbot responds
- ✅ Google sign-in works
- ✅ Feedback submission works

---

## Troubleshooting

**CORS errors?**
- Check `CLIENT_URL` in Railway matches Vercel URL exactly

**API calls fail?**
- Verify `VITE_API_URL` in Vercel includes `/api` at the end
- Check Railway backend is running (green status)

**Google sign-in fails?**
- Verify Supabase redirect URLs include your Vercel domain

---

**Total Time: ~15 minutes**

For detailed instructions, see `DEPLOYMENT_GUIDE.md`

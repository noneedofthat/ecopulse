# Migration Checklist - Railway to Render

Complete checklist for migrating EcoPulse from Railway to Render.

## Pre-Migration

### Backup Current Setup

- [ ] Export all environment variables from Railway
- [ ] Document current Railway URLs
- [ ] Take screenshots of Railway configuration
- [ ] Backup database (if any - Supabase is separate)
- [ ] Note any custom domains configured

### Gather API Keys

- [ ] Guardian API key
- [ ] Google Gemini API key
- [ ] OpenWeatherMap API key
- [ ] Supabase URL
- [ ] Supabase Anon Key
- [ ] Supabase Service Key
- [ ] Google OAuth Client ID (if using)
- [ ] Google OAuth Client Secret (if using)
- [ ] JWT Secret (generate new or reuse)

### Prepare Repository

- [ ] Ensure code is pushed to GitHub
- [ ] Verify `package.json` scripts are correct
- [ ] Check `backend/src/server.js` has correct start command
- [ ] Verify `.gitignore` excludes `.env` files
- [ ] Test build locally: `cd frontend && npm run build`
- [ ] Test backend locally: `cd backend && npm start`

---

## Migration Steps

### Phase 1: Deploy Backend to Render

- [ ] Go to https://dashboard.render.com
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Select ecopulse repository
- [ ] Configure service:
  - [ ] Name: `ecopulse-backend`
  - [ ] Region: Choose closest to you
  - [ ] Branch: `main`
  - [ ] Root Directory: `backend`
  - [ ] Runtime: Node
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
  - [ ] Instance Type: Free

- [ ] Add environment variables:
  - [ ] NODE_ENV=production
  - [ ] PORT=4000
  - [ ] CLIENT_URL (leave blank for now)
  - [ ] JWT_SECRET
  - [ ] JWT_EXPIRES_IN=7d
  - [ ] GUARDIAN_API_KEY
  - [ ] GEMINI_API_KEY
  - [ ] OPENWEATHER_API_KEY
  - [ ] SUPABASE_URL
  - [ ] SUPABASE_SERVICE_KEY
  - [ ] GOOGLE_CLIENT_ID (optional)
  - [ ] GOOGLE_CLIENT_SECRET (optional)
  - [ ] GOOGLE_CALLBACK_URL (optional)

- [ ] Click "Create Web Service"
- [ ] Wait for deployment (5-10 minutes)
- [ ] Copy backend URL: `https://ecopulse-backend-xxxx.onrender.com`
- [ ] Test health endpoint: `/api/health`
- [ ] Test news endpoint: `/api/news?page=1`

### Phase 2: Deploy Frontend to Render

- [ ] Click "New +" → "Static Site"
- [ ] Select ecopulse repository
- [ ] Configure site:
  - [ ] Name: `ecopulse-frontend`
  - [ ] Region: Same as backend
  - [ ] Branch: `main`
  - [ ] Root Directory: `frontend`
  - [ ] Build Command: `npm install && npm run build`
  - [ ] Publish Directory: `dist`

- [ ] Add environment variables:
  - [ ] VITE_API_URL (your backend URL)
  - [ ] VITE_SUPABASE_URL
  - [ ] VITE_SUPABASE_ANON_KEY

- [ ] Click "Create Static Site"
- [ ] Wait for deployment (5-10 minutes)
- [ ] Copy frontend URL: `https://ecopulse-frontend-xxxx.onrender.com`

### Phase 3: Update CORS Configuration

- [ ] Go to backend service in Render
- [ ] Click "Environment" tab
- [ ] Update CLIENT_URL to frontend URL
- [ ] Save changes (triggers redeploy)
- [ ] Wait for redeploy (2-3 minutes)

### Phase 4: Update External Services

#### Supabase Configuration

- [ ] Go to Supabase dashboard
- [ ] Navigate to Authentication → URL Configuration
- [ ] Update Site URL to new frontend URL
- [ ] Add redirect URLs:
  - [ ] `https://ecopulse-frontend-xxxx.onrender.com/*`
  - [ ] `https://ecopulse-frontend-xxxx.onrender.com/auth/callback`
- [ ] Save changes

#### Google OAuth Configuration (if using)

- [ ] Go to Google Cloud Console
- [ ] Navigate to APIs & Services → Credentials
- [ ] Edit OAuth 2.0 Client ID
- [ ] Update Authorized JavaScript origins:
  - [ ] Add: `https://ecopulse-frontend-xxxx.onrender.com`
- [ ] Update Authorized redirect URIs:
  - [ ] Add: `https://ecopulse-backend-xxxx.onrender.com/api/auth/google/callback`
- [ ] Save changes

---

## Testing

### Backend Tests

- [ ] Health check: `https://ecopulse-backend-xxxx.onrender.com/api/health`
- [ ] News API: `https://ecopulse-backend-xxxx.onrender.com/api/news?page=1`
- [ ] AQI API: `https://ecopulse-backend-xxxx.onrender.com/api/aqi/current?lat=40.7128&lon=-74.0060`
- [ ] Check logs for errors in Render dashboard

### Frontend Tests

- [ ] Visit frontend URL
- [ ] Homepage loads correctly
- [ ] News feed displays articles
- [ ] Search functionality works
- [ ] Category filters work
- [ ] Location filters work
- [ ] Pagination works
- [ ] AI summary modal works
- [ ] Navigate to AQI page
- [ ] AQI map loads
- [ ] Search location works
- [ ] Click on map works
- [ ] Historical chart displays
- [ ] Navigate to NGO page
- [ ] NGO cards display
- [ ] Category filters work
- [ ] Search works
- [ ] Donation links work
- [ ] Navigate to About page
- [ ] Content displays correctly
- [ ] Navigate to Feedback page
- [ ] Google sign-in works
- [ ] Feedback form works
- [ ] Feedback submits successfully
- [ ] Test chatbot
- [ ] Chatbot opens
- [ ] Chatbot responds
- [ ] Conversation history works

### Cross-Browser Testing

- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge

### Mobile Testing

- [ ] Test on mobile device
- [ ] Navigation menu works
- [ ] All pages responsive
- [ ] Chatbot works on mobile

---

## Post-Migration

### Performance Optimization

- [ ] Set up UptimeRobot to prevent cold starts:
  - [ ] Sign up at https://uptimerobot.com
  - [ ] Add HTTP monitor
  - [ ] URL: `https://ecopulse-backend-xxxx.onrender.com/api/health`
  - [ ] Interval: 14 minutes
  - [ ] Verify monitor is active

### Monitoring Setup

- [ ] Check Render logs for errors
- [ ] Monitor response times
- [ ] Check build times
- [ ] Monitor bandwidth usage

### Documentation Updates

- [ ] Update README.md with new URLs
- [ ] Update deployment documentation
- [ ] Document any issues encountered
- [ ] Update team/client with new URLs

### Cleanup

- [ ] Keep Railway running for 24-48 hours (safety net)
- [ ] Monitor Render deployment for issues
- [ ] Once stable, delete Railway services
- [ ] Remove Railway environment variables
- [ ] Cancel Railway subscription

---

## Rollback Plan (If Needed)

If something goes wrong:

1. **Immediate:** Railway is still running
2. **Frontend:** Point DNS back to Railway
3. **Backend:** Update frontend env to Railway URL
4. **Debug:** Check Render logs for errors
5. **Fix:** Correct configuration issues
6. **Retry:** Redeploy to Render

---

## Cost Tracking

### Before Migration (Railway)
- Backend: $5-10/month
- Frontend: $5-10/month
- **Total: $10-20/month**

### After Migration (Render Free)
- Backend: $0/month (with cold starts)
- Frontend: $0/month
- **Total: $0/month**

### After Migration (Render Paid)
- Backend: $7/month (no cold starts)
- Frontend: $0/month
- **Total: $7/month**

**Savings: $3-13/month**

---

## Troubleshooting

### Backend won't start
- [ ] Check logs in Render dashboard
- [ ] Verify all environment variables are set
- [ ] Check `package.json` start script
- [ ] Test locally: `cd backend && npm start`

### Frontend shows API errors
- [ ] Verify VITE_API_URL is correct
- [ ] Check backend is running
- [ ] Verify CORS settings (CLIENT_URL)
- [ ] Check browser console for errors

### Google OAuth not working
- [ ] Verify redirect URIs in Google Console
- [ ] Check GOOGLE_CALLBACK_URL in backend
- [ ] Verify Supabase redirect URLs
- [ ] Check browser console for errors

### Cold starts too slow
- [ ] Set up UptimeRobot
- [ ] Consider upgrading to Render Starter ($7/month)
- [ ] Use GitHub Actions keep-alive workflow

---

## Success Criteria

Migration is successful when:

- [x] Backend deploys without errors
- [x] Frontend deploys without errors
- [x] All API endpoints work
- [x] All pages load correctly
- [x] All features work as expected
- [x] No console errors
- [x] Performance is acceptable
- [x] Google OAuth works (if using)
- [x] Feedback system works
- [x] Chatbot works
- [x] Mobile experience is good

---

## Timeline

- **Preparation:** 15 minutes
- **Backend deployment:** 10 minutes
- **Frontend deployment:** 10 minutes
- **Configuration:** 10 minutes
- **Testing:** 20 minutes
- **Total:** ~65 minutes

---

## Support Resources

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- EcoPulse Docs: See RENDER_QUICK_START.md
- Full Guide: See RENDER_DEPLOYMENT.md

---

## Notes

Use this space to document any issues or customizations:

```
Date: ___________
Issues encountered:


Solutions applied:


Custom configuration:


Performance notes:


```

---

**Good luck with your migration! 🚀**

Once complete, you'll have a fully functional EcoPulse deployment on Render for FREE!

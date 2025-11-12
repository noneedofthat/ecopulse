# Firebase Email Verification Setup

## The Issue

Email verification emails are not being sent because Firebase email settings need to be configured.

## Step-by-Step Setup

### Step 1: Enable Email/Password Authentication

1. Go to **Firebase Console**: https://console.firebase.google.com/
2. Select your **EcoPulse project**
3. Click **Authentication** in the left sidebar
4. Click the **Sign-in method** tab
5. Find **Email/Password** in the list
6. Make sure it's **Enabled** (should already be enabled)

### Step 2: Configure Email Templates

1. Still in **Authentication**, click the **Templates** tab at the top
2. You'll see different email types:
   - Email address verification
   - Password reset
   - Email address change

3. Click on **"Email address verification"**

4. **Customize the email** (optional but recommended):
   - **From name**: `EcoPulse` (or your preferred name)
   - **From email**: Will use Firebase's default (noreply@your-project.firebaseapp.com)
   - **Reply-to email**: Your support email (e.g., climatexecopulse@gmail.com)
   - **Subject**: Keep default or customize
   - **Body**: Keep default or customize

5. Click **Save**

### Step 3: Configure Action URL (Important!)

1. Still in the **Templates** tab
2. At the bottom, you'll see **"Customize action URL"**
3. Click **"Customize action URL"**
4. You'll see a field for the action URL

5. **For Local Testing:**
   - Leave it as default: `https://your-project.firebaseapp.com/__/auth/action`

6. **For Production (Netlify):**
   - After deploying, come back and update this to:
   - `https://your-site-name.netlify.app/__/auth/action`

7. Click **Save**

### Step 4: Verify Authorized Domains

1. Go to **Authentication** → **Settings** tab
2. Scroll to **Authorized domains**
3. Make sure these are listed:
   - `localhost` (for local testing)
   - `your-project.firebaseapp.com` (Firebase default)
   - `your-site-name.netlify.app` (your Netlify domain)

4. If your Netlify domain is missing, click **Add domain** and add it

### Step 5: Test Email Sending

1. **Register a new account** with a real email address
2. Check the **Firebase Console** → **Authentication** → **Users** tab
3. You should see the new user with a **warning icon** (⚠️) indicating email not verified
4. **Check your email inbox** (and spam folder!)
5. You should receive a verification email

## Troubleshooting

### No Email Received?

**Check these:**

1. **Spam/Junk Folder:**
   - Firebase emails often go to spam
   - Check your spam folder first!

2. **Email Service Delay:**
   - Can take 1-5 minutes
   - Be patient

3. **Firebase Console Errors:**
   - Go to Firebase Console → Authentication → Users
   - Click on the user
   - Check if there are any error messages

4. **Check Browser Console:**
   - Open browser developer tools (F12)
   - Look for errors when registering
   - Share any error messages

### Email Sent But Link Doesn't Work?

**Possible causes:**

1. **Action URL not configured:**
   - Make sure you completed Step 3 above

2. **Domain not authorized:**
   - Make sure your Netlify domain is in authorized domains (Step 4)

3. **Link expired:**
   - Verification links expire after 3 days
   - User needs to register again

### User Can Still Login Without Verifying?

**This means the check isn't working. Let's verify:**

1. Check if the code was deployed correctly
2. Clear browser cache
3. Try in incognito/private mode
4. Check browser console for errors

## Testing Checklist

After setup, test these:

- [ ] Register with a real email
- [ ] Verification email is received (check spam!)
- [ ] Email has a verification link
- [ ] Click the link - it should redirect to your app
- [ ] Try to login before verifying - should show error
- [ ] After clicking link, login should work

## Important Notes

### Email Sending Limits:

Firebase free tier has limits:
- **100 emails per day** for free tier
- Should be enough for testing and small apps
- Upgrade to Blaze plan for more

### Custom Email Domain:

To send emails from your own domain (e.g., noreply@ecopulse.com):
- You need to upgrade to Firebase Blaze plan
- Configure custom SMTP settings
- Or use a service like SendGrid

### Email Template Customization:

You can customize:
- ✅ Subject line
- ✅ Email body text
- ✅ Button text
- ✅ From name
- ✅ Reply-to email
- ❌ Cannot change HTML design (Firebase limitation)

## Quick Fix If Emails Still Don't Send

If you've done everything and emails still don't send:

1. **Check Firebase Console → Authentication → Users:**
   - Is the user created?
   - Does it show "Email not verified"?

2. **Try manually sending verification email:**
   - In Firebase Console, click on the user
   - Click "Send verification email"
   - Check if it arrives

3. **Check Firebase quotas:**
   - Go to Firebase Console → Usage
   - Make sure you haven't hit email limits

4. **Try a different email provider:**
   - Gmail sometimes blocks Firebase emails
   - Try with a different email service

## Alternative: Use Firebase UI

If you want a simpler solution, you can use Firebase UI which handles everything automatically:
- https://firebase.google.com/docs/auth/web/firebaseui

But the current implementation is better for customization!

---

**Follow these steps and email verification should work! 📧**

Let me know if you encounter any specific errors.

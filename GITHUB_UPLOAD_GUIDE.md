# GitHub Upload Guide for EcoPulse

## Step-by-Step Guide to Upload Your Project

### Step 1: Check Your .gitignore File

First, make sure you have a proper `.gitignore` file to exclude unnecessary files.

Your `.gitignore` should include:

```
# Dependencies
node_modules/

# Build output
dist/
build/

# Environment variables (IMPORTANT - Never commit this!)
.env
.env.local
.env.production

# IDE files
.vscode/
.idea/
*.swp
*.swo
.DS_Store

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/

# Misc
.cache/
.temp/
```

### Step 2: Create .gitignore (if it doesn't exist)

Run this command in your `ecopulse` folder:

```bash
cd ecopulse
```

Create `.gitignore` file with the content above.

### Step 3: Initialize Git Repository

```bash
# Initialize git (if not already done)
git init

# Check git status
git status
```

### Step 4: Stage Your Files

```bash
# Add all files (gitignore will exclude the unwanted ones)
git add .

# Check what will be committed
git status
```

### Step 5: Make Your First Commit

```bash
git commit -m "Initial commit: EcoPulse environmental news app"
```

### Step 6: Create GitHub Repository

1. Go to https://github.com
2. Click the **"+"** icon in the top right
3. Click **"New repository"**
4. Fill in:
   - **Repository name**: `ecopulse` (or your preferred name)
   - **Description**: "Environmental news aggregator with real-time updates"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README (you already have one)
5. Click **"Create repository"**

### Step 7: Connect to GitHub

GitHub will show you commands. Use these:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR-USERNAME/ecopulse.git

# Verify remote was added
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 8: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. **IMPORTANT**: Check that `.env` is NOT visible (it should be excluded)

---

## What Gets Uploaded (Included Files)

✅ **Source Code:**
- `src/` folder (all your React components)
- `public/` folder (logo, assets)

✅ **Configuration Files:**
- `package.json`
- `package-lock.json`
- `vite.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `eslint.config.js`
- `index.html`
- `netlify.toml`

✅ **Documentation:**
- `README.md`
- `.env.example`
- All guide files (DEPLOYMENT_GUIDE.md, etc.)

✅ **Git Files:**
- `.gitignore`

## What Gets Excluded (Not Uploaded)

❌ **Never Upload These:**
- `node_modules/` (too large, can be reinstalled)
- `dist/` (build output, generated on deployment)
- `.env` (contains secrets!)
- `.vscode/` (IDE settings)
- `logs/` (log files)

---

## Important Security Notes

### ⚠️ CRITICAL: Never Commit .env File!

Your `.env` file contains sensitive information:
- Firebase API keys
- News API key
- Gemini API key

**If you accidentally committed .env:**

1. **Remove it immediately:**
   ```bash
   git rm --cached .env
   git commit -m "Remove .env file"
   git push
   ```

2. **Rotate all your API keys** (get new ones):
   - Firebase: Generate new config
   - News API: Get new key
   - Gemini API: Get new key

3. **Update Netlify** with new keys

### ✅ Use .env.example Instead

Create `.env.example` with placeholder values:

```
VITE_FIREBASE_API_KEY=your-firebase-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_GUARDIAN_API_KEY=your-guardian-api-key-here
VITE_GEMINI_API_KEY=your-gemini-api-key-here
```

This shows others what environment variables they need without exposing your actual keys.

---

## Updating Your Repository

### After Making Changes:

```bash
# Check what changed
git status

# Add changes
git add .

# Commit with a message
git commit -m "Description of what you changed"

# Push to GitHub
git push
```

### Good Commit Message Examples:

- `"Add email verification feature"`
- `"Fix login button styling"`
- `"Update to Guardian API"`
- `"Improve loading states"`

---

## Cloning Your Repository (For Others or New Machine)

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/ecopulse.git

# Navigate to folder
cd ecopulse

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env with your actual API keys
# (use your text editor)

# Run the app
npm run dev
```

---

## Common Issues

### Issue: "Permission denied"
**Solution:** Make sure you're logged into GitHub and have access to the repository.

### Issue: "Repository not found"
**Solution:** Check the repository URL is correct.

### Issue: ".env file is visible on GitHub"
**Solution:** 
1. Remove it: `git rm --cached .env`
2. Add to .gitignore
3. Commit and push
4. **Rotate all API keys!**

### Issue: "node_modules uploaded"
**Solution:**
1. Add `node_modules/` to .gitignore
2. Remove from git: `git rm -r --cached node_modules`
3. Commit and push

---

## Repository Best Practices

### 1. Write a Good README

Your README should include:
- Project description
- Features
- Setup instructions
- Environment variables needed
- Deployment instructions

### 2. Add a License

Consider adding a license file (MIT, Apache, etc.)

### 3. Use Branches for Features

```bash
# Create a new branch
git checkout -b feature-name

# Make changes and commit
git add .
git commit -m "Add feature"

# Push branch
git push -u origin feature-name

# Merge on GitHub via Pull Request
```

### 4. Keep Commits Organized

- Make small, focused commits
- Write clear commit messages
- Commit related changes together

---

## Quick Command Reference

```bash
# Check status
git status

# Add all files
git add .

# Commit
git commit -m "Your message"

# Push
git push

# Pull latest changes
git pull

# View commit history
git log

# Create new branch
git checkout -b branch-name

# Switch branches
git checkout branch-name

# View remotes
git remote -v
```

---

## Your Repository is Ready! 🎉

After following these steps:
- ✅ Your code is safely backed up on GitHub
- ✅ Others can clone and run your project
- ✅ Your secrets are protected
- ✅ You can collaborate with others
- ✅ You have version control

**Repository URL:** `https://github.com/YOUR-USERNAME/ecopulse`

Share this URL with others or add it to your resume/portfolio!

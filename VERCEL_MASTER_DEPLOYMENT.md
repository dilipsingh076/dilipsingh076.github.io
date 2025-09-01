# 🚀 Vercel Master Branch Deployment Guide

## 📋 Quick Start for vercel-master Branch

Your portfolio is now configured to deploy from the `vercel-master` branch on Vercel.

### 🎯 **One-Command Deployment**

```bash
npm run deploy
```

This will:
1. ✅ Check you're on the `vercel-master` branch
2. 🔨 Build your project
3. 📤 Push to `vercel-master` branch
4. 🚀 Trigger Vercel deployment

### 🔧 **Manual Deployment Steps**

1. **Ensure you're on vercel-master branch:**
   ```bash
   git checkout vercel-master
   ```

2. **Build and deploy:**
   ```bash
   npm run build
   git add .
   git commit -m "Deploy to Vercel"
   git push origin vercel-master
   ```

## 🌐 **Vercel Dashboard Setup**

### 1. **Project Configuration**
- **Production Branch**: `vercel-master`
- **Framework Preset**: Next.js (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### 2. **Environment Variables**
Add these in Vercel dashboard → Settings → Environment Variables:

```bash
# Required
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
MONGODB_DB_NAME=portfolio
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Optional
ADMIN_EMAIL=admin@example.com
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

## 📁 **Branch Structure**

```
main (or master)          ← Your main development branch
├── vercel-master         ← Production deployment branch
│   ├── src/              ← Source code
│   ├── vercel.json       ← Vercel configuration
│   ├── .vercelignore     ← Deployment exclusions
│   └── deploy-vercel.sh  ← Deployment script
└── other-feature-branches
```

## 🔄 **Deployment Workflow**

1. **Develop on main branch**
2. **Merge to vercel-master when ready to deploy**
3. **Run `npm run deploy`**
4. **Vercel automatically builds and deploys**

## 🚨 **Troubleshooting**

### **Branch Issues**
```bash
# Check current branch
git branch --show-current

# Switch to vercel-master
git checkout vercel-master

# Create vercel-master if it doesn't exist
git checkout -b vercel-master
git push -u origin vercel-master
```

### **Build Issues**
```bash
# Test build locally
npm run build

# Check for errors
npm run lint
npm run type-check
```

### **Deployment Issues**
- Verify you're on `vercel-master` branch
- Check Vercel dashboard for build logs
- Ensure environment variables are set
- Verify MongoDB connection

## 📊 **Benefits of vercel-master Branch**

- **Separate from main development**
- **Clean deployment history**
- **Easy rollbacks**
- **Production-only changes**
- **Automatic deployments**

## 🎉 **You're All Set!**

Your portfolio is now configured for professional deployment on Vercel from the `vercel-master` branch.

**Next step**: Run `npm run deploy` and watch your portfolio go live! 🚀

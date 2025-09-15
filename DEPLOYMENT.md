# Deployment Guide for Vercel

This guide explains how to properly deploy your Next.js portfolio to Vercel with environment variables.

## Environment Variables Setup

Since you're not committing `.env.local` (which is correct for security), you need to configure environment variables in Vercel.

### 1. Vercel Dashboard Setup

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following environment variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
MONGODB_DB_NAME=portfolio
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@example.com
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app/api
OPENAI_API_KEY=your-openai-api-key
SENDGRID_API_KEY=your-sendgrid-api-key
RESEND_API_KEY=your-resend-api-key
NODE_ENV=production
```

### 2. Environment Variable Types

- **Production**: For production deployments
- **Preview**: For preview deployments (pull requests)
- **Development**: For local development (optional)

Make sure to set all variables for **Production** environment.

## Deployment Methods

### Method 1: Automatic Deployment (Recommended)

1. Connect your GitHub repository to Vercel
2. Push to your `vercel-master` branch
3. Vercel will automatically build and deploy

### Method 2: Manual Deployment Script

```bash
# Run the deployment script
./deploy-vercel.sh
```

### Method 3: GitHub Actions (Optional)

The repository includes GitHub Actions workflows:

- `build-validation.yml`: Validates builds on push/PR
- `deploy.yml`: Full deployment to Vercel (requires additional setup)

## Build Process

The build process is configured to:

1. ✅ Handle missing environment variables gracefully during build
2. ✅ Use Vercel's environment variables during runtime
3. ✅ Pass all linting and type checking
4. ✅ Generate optimized production build

## Troubleshooting

### Build Fails with MongoDB Error

If you see MongoDB connection errors during build:

1. Ensure all environment variables are set in Vercel dashboard
2. Check that `MONGODB_URI` is correctly formatted
3. Verify database permissions

### Environment Variables Not Working

1. Check Vercel dashboard → Settings → Environment Variables
2. Ensure variables are set for the correct environment (Production)
3. Redeploy after adding new variables

### GitHub Actions Fails

If using GitHub Actions deployment:

1. Add required secrets to GitHub repository:
   - `VERCEL_TOKEN`
   - `ORG_ID`
   - `PROJECT_ID`
2. Or use the simpler `build-validation.yml` workflow

## Security Notes

- ✅ `.env.local` is properly ignored in `.gitignore`
- ✅ Environment variables are stored securely in Vercel
- ✅ No sensitive data is committed to the repository
- ✅ Build process works without local environment variables

## File Structure

```
├── .github/workflows/
│   ├── build-validation.yml    # Build validation only
│   └── deploy.yml             # Full deployment (optional)
├── .gitignore                 # Properly ignores .env.local
├── vercel.json               # Vercel configuration
├── deploy-vercel.sh          # Manual deployment script
└── env.template              # Template for local development
```

## Next Steps

1. Set up environment variables in Vercel dashboard
2. Push to `vercel-master` branch
3. Monitor deployment in Vercel dashboard
4. Test your deployed application

Your application is now ready for secure deployment to Vercel! 🚀

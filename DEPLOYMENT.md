# Deployment Guide - Vercel

This guide will help you deploy your Next.js portfolio to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **Node.js**: Version 18.0.0 or higher

## Deployment Steps

### 1. Connect Your Repository

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. **Important**: Set the production branch to `vercel-master`
5. Vercel will automatically detect it's a Next.js project

### 2. Configure Environment Variables

If you have any environment variables (like MongoDB connection strings, email API keys), add them in the Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add your variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `MONGODB_DB_NAME`: Your database name
   - `EMAIL_USER`: Your email username
   - `EMAIL_PASS`: Your email password
   - Any other environment variables your app needs

### 3. Deploy

1. Vercel will automatically build and deploy your project from the `vercel-master` branch
2. The first deployment might take a few minutes
3. You'll get a unique URL (e.g., `your-project.vercel.app`)

### 4. Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Domains"
2. Add your custom domain
3. Update your DNS settings as instructed by Vercel

## Configuration Files

- `vercel.json`: Vercel-specific configuration
- `.vercelignore`: Files to exclude from deployment
- `next.config.js`: Optimized for Vercel deployment

## Benefits of Vercel

- **Automatic Deployments**: Every push to `vercel-master` branch triggers a new deployment
- **Preview Deployments**: Pull requests get preview URLs
- **Edge Functions**: API routes run globally
- **Image Optimization**: Built-in image optimization
- **Analytics**: Built-in performance monitoring
- **HTTPS**: Automatic SSL certificates

## Troubleshooting

### Build Errors
- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Environment Variables
- Make sure all required environment variables are set
- Check that variable names match exactly

### API Routes
- Ensure your API routes are in `app/api/` directory
- Check that database connections work in production

### Branch Configuration
- Verify that Vercel is set to deploy from the `vercel-master` branch
- Check that your pushes are going to the correct branch

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

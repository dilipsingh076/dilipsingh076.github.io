#!/bin/bash

# Vercel Deployment Script for vercel-master branch
echo "🚀 Starting Vercel deployment process..."

# Check if we're on the vercel-master branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "vercel-master" ]; then
    echo "❌ Error: You must be on the vercel-master branch to deploy"
    echo "Current branch: $current_branch"
    echo "Please switch to vercel-master branch first:"
    echo "  git checkout vercel-master"
    exit 1
fi

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 You have uncommitted changes. Please commit them first:"
    git status --short
    echo ""
    echo "Run: git add . && git commit -m 'Your commit message'"
    exit 1
fi

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

echo "✅ Build successful!"

# Push to vercel-master branch
echo "📤 Pushing to vercel-master branch..."
git push origin vercel-master

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to vercel-master branch!"
    echo ""
    echo "🎉 Your project is now being deployed on Vercel!"
    echo "📱 Check your Vercel dashboard for deployment status"
    echo "🌐 Your site will be available at: https://your-project.vercel.app"
    echo ""
    echo "💡 Remember to:"
    echo "   - Configure environment variables in Vercel dashboard"
    echo "   - Set up your custom domain (optional)"
    echo "   - Monitor deployment logs for any issues"
else
    echo "❌ Failed to push to vercel-master branch"
    exit 1
fi

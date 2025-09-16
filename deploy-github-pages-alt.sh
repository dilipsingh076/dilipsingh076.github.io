#!/bin/bash

# Alternative GitHub Pages Deployment Script (without git subtree)
# This script uses a separate gh-pages branch approach

echo "🚀 Starting GitHub Pages deployment (alternative method)..."

# Build the static site
echo "📦 Building static site..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

# Create .nojekyll file to bypass Jekyll processing
echo "📝 Creating .nojekyll file..."
touch out/.nojekyll

# Check if gh-pages branch exists
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "📁 gh-pages branch exists, switching to it..."
    git checkout gh-pages
else
    echo "📁 Creating gh-pages branch..."
    git checkout --orphan gh-pages
    git rm -rf .
fi

# Copy build files to root
echo "📋 Copying build files..."
cp -r out/* .
cp out/.nojekyll . 2>/dev/null || true

# Add all files
echo "📁 Adding files to git..."
git add .

# Commit the changes
echo "💾 Committing changes..."
git commit -m "Deploy to GitHub Pages - $(date)"

# Push to gh-pages branch
echo "🚀 Pushing to GitHub Pages..."
git push origin gh-pages

# Switch back to master branch
echo "🔄 Switching back to master branch..."
git checkout master

echo "✅ Deployment completed successfully!"
echo "🌐 Your site should be available at: https://dilipsingh076.github.io"
echo "⏰ It may take 5-10 minutes for GitHub to build and deploy your site."

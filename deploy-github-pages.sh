#!/bin/bash
set -e

echo "🚀 Starting GitHub Pages deployment..."

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

# Add all files to git
echo "📁 Adding files to git..."
git add out/

# Commit the changes
echo "💾 Committing changes..."
git commit -m "Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

# Push to gh-pages branch
echo "🚀 Pushing to GitHub Pages..."
git subtree push --prefix out origin gh-pages

echo "✅ Deployment completed successfully!"
echo "🌐 Your site should be available at: https://dilipsingh076.github.io"

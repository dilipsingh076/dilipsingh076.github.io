#!/bin/bash
set -e

echo "🚀 Starting GitHub Pages deployment (static export)..."

# Build static site (now outputs to 'out' with output: 'export')
npm run build

# Go to out directory
cd out

# Remove any accidental node_modules or .next folders
rm -rf node_modules .next

# Initialize a new git repo in out/
git init
git remote add origin https://github.com/dilipsingh076/dilipsingh076.github.io.git

# Add and commit only the static files
git add .
git commit -m "Deploy static site to GitHub Pages"

# Force push to gh-pages branch
git branch -M gh-pages
git push -f origin gh-pages

echo "✅ Deployment completed! Visit: https://dilipsingh076.github.io"
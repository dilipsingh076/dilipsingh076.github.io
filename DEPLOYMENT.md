# GitHub Pages Deployment Guide

This project has been configured for static deployment on GitHub Pages. All API-related functionality has been removed and replaced with static data from constants files.

## Prerequisites

- Node.js 18+ installed
- Git configured with your GitHub credentials
- Repository set up on GitHub

## Deployment Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Static Site

```bash
npm run build
```

This will create a static export in the `out/` directory.

### 3. Deploy to GitHub Pages

#### Option A: Using the deployment script (Recommended)

```bash
./deploy-github-pages.sh
```

#### Option B: Manual deployment

```bash
# Create .nojekyll file
touch out/.nojekyll

# Add files to git
git add out/

# Commit changes
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
git subtree push --prefix out origin gh-pages
```

### 4. Configure GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to "Pages" section
3. Set source to "Deploy from a branch"
4. Select "gh-pages" branch
5. Set folder to "/ (root)"

## Project Structure

### Static Data Sources

All data is now sourced from constants files:

- **Projects**: `src/components/projects/constants/projects-page-data.ts`
- **Skills**: `src/components/skills/constants/skills-page-data.ts`
- **Blog**: `src/components/blog/constants/blog-page-data.ts`
- **About**: `src/components/about/constants/about-page-data.ts`

### Removed Components

The following have been removed for static deployment:

- Redux store and slices
- API services and routes
- Admin functionality
- Database models
- Vercel deployment configs

### Updated Components

- All components now use static data from constants
- Hooks updated to work with static data
- Contact form simulates submission (no actual email sending)

## Customization

To update the content:

1. Edit the appropriate constants file in `src/components/*/constants/`
2. Rebuild and redeploy

## Troubleshooting

### Build Issues

- Ensure all imports are correct
- Check that constants files export the required data
- Verify TypeScript types match

### Deployment Issues

- Ensure you have push access to the repository
- Check that the gh-pages branch exists
- Verify GitHub Pages is enabled in repository settings

## Local Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run type-check

# Lint code
npm run lint
```

## Features

- ✅ Static site generation
- ✅ Responsive design
- ✅ Dark/light theme support
- ✅ SEO optimized
- ✅ Fast loading
- ✅ GitHub Pages compatible

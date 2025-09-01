# Blog Features Documentation

This document outlines the complete blog functionality that has been implemented in the portfolio website.

## Features Overview

### 🎯 Core Features
- **Create Blog Posts**: Full-featured blog post creation with rich text editor
- **Edit Blog Posts**: Update existing blog posts with real-time preview
- **Delete Blog Posts**: Remove blog posts with confirmation
- **View Blog Posts**: Read individual blog posts with beautiful layout
- **Blog Management**: Admin interface for managing all blog posts
- **Search & Filter**: Advanced search and category filtering
- **Featured Posts**: Highlight important blog posts
- **Tags System**: Organize posts with tags
- **Draft System**: Save posts as drafts before publishing

### 🎨 User Interface
- **Modern Design**: Clean, responsive design with dark/light theme support
- **Smooth Animations**: Framer Motion animations for better UX
- **Real-time Preview**: Live preview while creating/editing posts
- **Mobile Responsive**: Optimized for all device sizes
- **Loading States**: Proper loading indicators and error handling

## File Structure

```
src/
├── app/
│   ├── blog/
│   │   ├── create/
│   │   │   └── page.tsx          # Create new blog post
│   │   ├── edit/
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Edit existing blog post
│   │   ├── manage/
│   │   │   └── page.tsx          # Blog management dashboard
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Individual blog post view
│   │   └── page.tsx              # Blog listing page
│   └── api/
│       └── blog/
│           ├── [slug]/
│           │   └── route.ts      # Single blog post API
│           ├── featured/
│           │   └── route.ts      # Featured posts API
│           └── route.ts          # Blog posts list API
├── lib/
│   ├── models/
│   │   └── Blog.ts              # MongoDB Blog model
│   └── data.ts                  # Utility functions
├── store/
│   └── slices/
│       └── blogSlice.ts         # Redux blog state management
└── scripts/
    └── seed-blogs.js            # Database seeding script
```

## API Endpoints

### GET `/api/blog`
- **Purpose**: Fetch paginated blog posts
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `category`: Filter by category
  - `search`: Search in title, excerpt, content, and tags
  - `limit`: Posts per page (default: 9)
- **Response**: Posts array with pagination info

### POST `/api/blog`
- **Purpose**: Create new blog post
- **Body**: Blog post data (title, excerpt, content, category, author, tags, featured, published)
- **Response**: Created post with ID

### GET `/api/blog/[slug]`
- **Purpose**: Fetch single blog post by slug
- **Response**: Blog post data

### PUT `/api/blog/[slug]`
- **Purpose**: Update existing blog post
- **Body**: Updated blog post data
- **Response**: Updated post data

### DELETE `/api/blog/[slug]`
- **Purpose**: Delete blog post
- **Response**: Success message with post ID

### GET `/api/blog/featured`
- **Purpose**: Fetch featured blog posts
- **Response**: Array of featured posts

## Database Schema

```typescript
interface IBlog {
  title: string;           // Required
  excerpt: string;         // Required
  content: string;         // Required
  date: string;           // Required (YYYY-MM-DD)
  readTime: string;       // Required (e.g., "5 min read")
  category: string;       // Required
  author: string;         // Required
  slug: string;           // Required, unique
  featured: boolean;      // Default: false
  tags: string[];         // Array of tags
  image?: string;         // Optional image URL
  published: boolean;     // Default: true
  createdAt: string;      // Required (ISO string)
  updatedAt: string;      // Required (ISO string)
}
```

## State Management

The blog functionality uses Redux Toolkit for state management with the following features:

### Blog Slice Features
- **Posts Management**: CRUD operations for blog posts
- **Pagination**: Handle large numbers of posts
- **Search & Filter**: Real-time search and category filtering
- **Loading States**: Track loading and error states
- **Featured Posts**: Separate state for featured posts

### Async Thunks
- `fetchBlogPosts`: Get paginated posts with filters
- `fetchFeaturedPosts`: Get featured posts
- `fetchBlogPostBySlug`: Get single post by slug
- `createBlogPost`: Create new post
- `updateBlogPost`: Update existing post
- `deleteBlogPost`: Delete post

## Usage Guide

### Creating a Blog Post

1. Navigate to `/blog/create`
2. Fill in the required fields:
   - **Title**: Blog post title
   - **Category**: Select from predefined categories
   - **Author**: Author name
   - **Excerpt**: Brief description
   - **Content**: Main blog content
3. Add tags (optional)
4. Configure settings:
   - **Featured**: Mark as featured post
   - **Published**: Publish immediately or save as draft
5. Use preview to see how the post will look
6. Click "Create Post" to save

### Editing a Blog Post

1. Go to `/blog/manage`
2. Find the post you want to edit
3. Click the edit icon (pencil)
4. Make your changes
5. Use preview to verify changes
6. Click "Update Post" to save

### Managing Blog Posts

1. Navigate to `/blog/manage`
2. Use search and category filters to find posts
3. Actions available:
   - **View**: Click eye icon to view post
   - **Edit**: Click pencil icon to edit
   - **Delete**: Click trash icon to delete (with confirmation)

### Viewing Blog Posts

1. Go to `/blog` to see all posts
2. Use search and category filters
3. Click on any post to read the full article
4. Featured posts are highlighted at the top

## Setup Instructions

### 1. Environment Variables
Ensure you have the following environment variables set in `.env.local`:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=portfolio
```

### 2. Database Setup
Run the seeding script to populate the database with sample posts:

```bash
node scripts/seed-blogs.js
```

### 3. Dependencies
Make sure you have the required dependencies installed:

```bash
npm install mongoose @reduxjs/toolkit react-redux framer-motion react-icons
```

## Customization

### Adding New Categories
Update the categories array in the following files:
- `src/app/blog/create/page.tsx`
- `src/app/blog/edit/[slug]/page.tsx`
- `src/app/blog/manage/page.tsx`
- `src/app/blog/page.tsx`

### Styling
The blog uses Tailwind CSS classes. You can customize the appearance by modifying the CSS classes in the component files.

### Blog Model
To add new fields to the blog model, update:
- `src/lib/models/Blog.ts`
- `src/store/slices/blogSlice.ts`
- Form components in create/edit pages

## Performance Optimizations

- **Pagination**: Large datasets are paginated for better performance
- **Indexing**: MongoDB indexes on frequently queried fields
- **Lazy Loading**: Images and heavy components are lazy loaded
- **Caching**: Redux state caching for better UX
- **Optimistic Updates**: UI updates immediately while API calls are in progress

## Security Considerations

- **Input Validation**: All user inputs are validated
- **XSS Prevention**: Content is properly sanitized
- **Rate Limiting**: API endpoints should implement rate limiting
- **Authentication**: Consider adding authentication for admin features

## Future Enhancements

- **Rich Text Editor**: WYSIWYG editor for better content creation
- **Image Upload**: Direct image upload functionality
- **Comments System**: Allow readers to comment on posts
- **Social Sharing**: Easy sharing to social media platforms
- **SEO Optimization**: Meta tags and structured data
- **Analytics**: Track post views and engagement
- **Email Notifications**: Notify subscribers of new posts
- **Multi-language Support**: Internationalization support

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your `MONGODB_URI` environment variable
   - Ensure MongoDB is running and accessible

2. **Posts Not Loading**
   - Check browser console for errors
   - Verify API endpoints are working
   - Check Redux DevTools for state issues

3. **Form Validation Errors**
   - Ensure all required fields are filled
   - Check for proper data types

4. **Image Issues**
   - Verify image URLs are accessible
   - Check for CORS issues with external images

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in your environment variables.

## Support

For issues or questions about the blog functionality, please check:
1. Browser console for JavaScript errors
2. Network tab for API call failures
3. Redux DevTools for state management issues
4. MongoDB logs for database issues

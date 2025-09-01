# MongoDB Integration Setup

This document explains how to set up and use MongoDB with your portfolio website.

## Prerequisites

- MongoDB Atlas account (free tier available)
- Node.js and npm installed

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=mongodb+srv://dilipsinghf:7665135229D.j@dilipsinghportfoliogith.7b9a6iw.mongodb.net/
MONGODB_DB_NAME=portfolio
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Install Dependencies

The required dependencies are already installed:
- `mongodb` - MongoDB driver
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variable management

### 3. Database Seeding

To populate your database with sample blog data, run:

```bash
npm run seed
```

This will:
- Connect to your MongoDB database
- Clear existing blog posts
- Insert 6 sample blog posts
- Display the inserted posts

### 4. Sample Blog Document Structure

Here's an example of a blog document that will be inserted into the `blogs` collection:

```json
{
  "_id": "ObjectId",
  "title": "Building Scalable Micro Frontends with Single SPA",
  "excerpt": "Learn how to implement micro frontend architecture using Single SPA for better scalability and team collaboration.",
  "content": "# Building Scalable Micro Frontends with Single SPA\n\nMicro frontends have become increasingly popular...",
  "date": "2024-01-15",
  "readTime": "8 min read",
  "category": "Architecture",
  "author": "Dilip Singh",
  "slug": "micro-frontends-single-spa",
  "featured": true,
  "tags": ["Micro Frontends", "Single SPA", "Architecture", "Scalability"],
  "image": "",
  "published": true,
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

## API Endpoints

The following API endpoints now use MongoDB instead of dummy data:

### GET /api/blog
- Fetches all published blog posts with pagination
- Supports filtering by category and search
- Returns categories for filtering

### GET /api/blog/featured
- Fetches all featured and published blog posts

### GET /api/blog/[slug]
- Fetches a specific blog post by slug

### POST /api/blog
- Creates a new blog post
- Validates required fields
- Generates slug and read time automatically

### PUT /api/blog/[slug]
- Updates an existing blog post by slug

### DELETE /api/blog/[slug]
- Deletes a blog post by slug

## Database Schema

The Blog model includes the following fields:

- `title` (String, required) - Blog post title
- `excerpt` (String, required) - Short description
- `content` (String, required) - Full blog content (markdown)
- `date` (String, required) - Publication date
- `readTime` (String, required) - Estimated reading time
- `category` (String, required) - Blog category
- `author` (String, required) - Author name
- `slug` (String, required, unique) - URL-friendly identifier
- `featured` (Boolean, default: false) - Featured post flag
- `tags` (Array of Strings) - Blog tags
- `image` (String, optional) - Featured image URL
- `published` (Boolean, default: true) - Publication status
- `createdAt` (String, required) - Creation timestamp
- `updatedAt` (String, required) - Last update timestamp

## Indexes

The following indexes are created for better query performance:
- `slug` - For fast slug-based lookups
- `category` - For category filtering
- `featured` - For featured posts queries
- `published` - For published posts filtering
- `tags` - For tag-based searches

## Development

### Running the Application

```bash
npm run dev
```

The application will now fetch blog data from MongoDB instead of using dummy data.

### Adding New Blog Posts

You can add new blog posts through:
1. The API endpoint (`POST /api/blog`)
2. Directly in MongoDB Atlas
3. Running the seeding script again (will clear existing data)

### Database Connection

The application uses a connection pooling strategy to efficiently manage MongoDB connections. The connection is cached and reused across API calls.

## Troubleshooting

### Connection Issues
- Verify your MongoDB URI is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure the database name is correct

### Data Issues
- Run `npm run seed` to reset the database with sample data
- Check the MongoDB Atlas console for data verification

### API Issues
- Check the browser console for error messages
- Verify the API endpoints are working with tools like Postman
- Check the server logs for detailed error information

# Admin Dashboard

This admin dashboard allows you to manage your portfolio content including blog posts, skills, projects, and contact submissions.

## Features

### 📊 Dashboard Overview
- Real-time statistics for all content types
- Quick navigation to different management sections
- Overview of total blog posts, skills, projects, and contact submissions

### 📝 Blog Posts Management
- **Create** new blog posts with rich content
- **Edit** existing blog posts
- **Delete** blog posts
- **Publish/Unpublish** posts
- **Feature** important posts
- **Add tags** and categories
- **Auto-generate slugs** from titles
- **Set read time** and publication dates

### 💻 Skills Management
- **Add** new technical skills
- **Edit** skill details and proficiency levels
- **Delete** skills
- **Categorize** skills (Frontend, Backend, Database, DevOps, Tools)
- **Set proficiency** levels (0-100%)
- **Add icons** for visual representation

### 🚀 Projects Management
- **Create** new portfolio projects
- **Edit** project details
- **Delete** projects
- **Feature** important projects
- **Add technologies** used
- **Set categories** (Web App, Mobile App, Dashboard, etc.)
- **Manage** GitHub and live URLs
- **Upload** project images

### 📧 Contact Submissions
- **View** all contact form submissions
- **Read** detailed messages
- **Delete** submissions
- **Reply** directly via email
- **Track** submission dates and statistics

## Getting Started

### 1. Setup MongoDB
Make sure your MongoDB connection is configured in your environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
```

### 2. Seed Initial Data
Run the seed script to populate your database with initial skills and projects data:

```bash
npm run seed-data
```

### 3. Access Admin Dashboard
Navigate to `/admin` in your application to access the admin dashboard.

## API Endpoints

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create new skill
- `GET /api/skills/[id]` - Get specific skill
- `PUT /api/skills/[id]` - Update skill
- `DELETE /api/skills/[id]` - Delete skill

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get specific project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Blog Posts
- `GET /api/blog` - Get all blog posts
- `POST /api/blog` - Create new blog post
- `GET /api/blog/[slug]` - Get specific blog post
- `PUT /api/blog/[slug]` - Update blog post
- `DELETE /api/blog/[slug]` - Delete blog post

### Contact Submissions
- `GET /api/contact/submissions` - Get all contact submissions
- `DELETE /api/contact/submissions/[id]` - Delete submission

## Database Models

### Skill Model
```typescript
interface Skill {
  _id: string;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
  proficiency: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Project Model
```typescript
interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Blog Model
```typescript
interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  slug: string;
  featured: boolean;
  tags: string[];
  image?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## Usage Tips

### Adding Skills
1. Navigate to Skills Management
2. Click "Add Skill"
3. Fill in the skill name, icon, category, and proficiency level
4. Click "Add Skill" to save

### Creating Projects
1. Go to Projects Management
2. Click "Add Project"
3. Fill in all required fields including title, description, and URLs
4. Add technologies by typing and pressing Enter
5. Set featured status and category
6. Click "Add Project" to save

### Managing Blog Posts
1. Access Blog Posts Management
2. Click "Add Blog Post"
3. Fill in title, content, and metadata
4. Add tags and set publication status
5. Click "Add Blog Post" to save

### Viewing Contact Submissions
1. Go to Contact Submissions
2. Click on any submission to view details
3. Use the "Reply via Email" button to respond
4. Delete submissions as needed

## Security Considerations

- Consider adding authentication to the admin dashboard
- Implement rate limiting on API endpoints
- Add input validation and sanitization
- Use environment variables for sensitive configuration
- Regularly backup your MongoDB database

## Customization

You can customize the admin dashboard by:
- Modifying the UI components in `/src/components/admin/`
- Adding new fields to the database models
- Creating additional API endpoints
- Customizing the styling with Tailwind CSS
- Adding new management sections as needed

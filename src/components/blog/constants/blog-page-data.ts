// Blog Page Data for Blog Route
import { FiCalendar, FiClock, FiUser, FiTag, FiArrowLeft, FiSearch, FiFilter } from 'react-icons/fi';

// Blog Post Interface
export interface BlogPost {
  id: string;
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

// Page Content Data
export const BLOG_PAGE_CONTENT = {
  header: {
    title: 'Blog & Articles',
    subtitle: 'Thoughts, tutorials, and insights on modern web development, technology trends, and best practices.',
  },
  
  search: {
    placeholder: 'Search articles...',
    noResults: 'No articles found matching your search.',
  },
  
  filter: {
    all: 'All Articles',
    noPostsFound: {
      title: 'No articles found',
      description: 'No articles match the selected category. Try selecting a different filter.',
    },
  },
  
  pagination: {
    previous: 'Previous',
    next: 'Next',
    page: 'Page',
    of: 'of',
  },
  
  article: {
    readMore: 'Read More',
    featured: 'Featured',
    publishedOn: 'Published on',
    readTime: 'read',
    by: 'by',
    tags: 'Tags',
  },
  
  callToAction: {
    title: 'Stay Updated',
    description: 'Subscribe to get notified about new articles and updates.',
    button: {
      text: 'Subscribe',
      href: '/contact',
    },
  },
  
  navigation: {
    backToHome: 'Back to Home',
  },
};

// Blog Categories
export const BLOG_CATEGORIES = [
  'All',
  'Architecture',
  'AI/ML',
  'Frontend',
  'Backend',
  'DevOps',
  'Tutorials',
  'Best Practices',
  'Tools',
  'Career',
];

// Action Icons
export const BLOG_ACTION_ICONS = {
  calendar: FiCalendar,
  clock: FiClock,
  user: FiUser,
  tag: FiTag,
  arrowLeft: FiArrowLeft,
  search: FiSearch,
  filter: FiFilter,
};

// Blog Posts Data (Static Data)
export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable Micro Frontends with Single SPA',
    excerpt: 'Learn how to implement micro frontend architecture using Single SPA for better scalability and team collaboration. Discover the benefits and challenges of this approach.',
    content: `# Building Scalable Micro Frontends with Single SPA

Micro frontends have become increasingly popular as applications grow in complexity and teams expand. Single SPA is a powerful framework that enables you to build micro frontends that can coexist and communicate effectively.

## What are Micro Frontends?

Micro frontends are an architectural style where frontend applications are composed of independent, deployable applications. Each micro frontend can be developed, tested, and deployed independently by different teams.

## Benefits of Single SPA

- **Independent Development**: Teams can work on different micro frontends simultaneously
- **Technology Diversity**: Different micro frontends can use different frameworks
- **Scalability**: Easier to scale teams and applications
- **Maintenance**: Smaller, focused codebases are easier to maintain

## Implementation Steps

1. **Setup Single SPA Root Config**
2. **Create Micro Frontend Applications**
3. **Configure Routing and Communication**
4. **Deploy and Monitor**

This approach has revolutionized how we build large-scale frontend applications.`,
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Architecture',
    author: 'Dilip Singh',
    slug: 'micro-frontends-single-spa',
    featured: true,
    tags: ['Micro Frontends', 'Single SPA', 'Architecture', 'Scalability'],
    published: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Integrating AI/ML in Modern Web Applications',
    excerpt: 'A comprehensive guide to integrating AI and machine learning capabilities in React and Next.js applications. From simple chatbots to complex recommendation systems.',
    content: `# Integrating AI/ML in Modern Web Applications

Artificial Intelligence and Machine Learning are transforming how we build web applications. From chatbots to recommendation systems, AI/ML integration is becoming essential for modern applications.

## Popular AI/ML Libraries

- **TensorFlow.js**: For browser-based machine learning
- **OpenAI API**: For natural language processing
- **Hugging Face**: For pre-trained models
- **Clarifai**: For image recognition

## Implementation Examples

### 1. Chatbot Integration
\`\`\`javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "Hello!" }],
});
\`\`\`

### 2. Image Recognition
\`\`\`javascript
import * as tf from '@tensorflow/tfjs';

const model = await tf.loadLayersModel('model.json');
const prediction = model.predict(imageTensor);
\`\`\`

## Best Practices

- Start with simple implementations
- Use pre-trained models when possible
- Implement proper error handling
- Consider performance implications
- Ensure data privacy and security

AI/ML integration opens up endless possibilities for creating intelligent, user-friendly applications.`,
    date: '2024-01-10',
    readTime: '12 min read',
    category: 'AI/ML',
    author: 'Dilip Singh',
    slug: 'ai-ml-web-applications',
    featured: true,
    tags: ['AI/ML', 'React', 'Next.js', 'OpenAI', 'TensorFlow'],
    published: true,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
  },
  {
    id: '3',
    title: 'Advanced React Patterns and Best Practices',
    excerpt: 'Explore advanced React patterns including render props, higher-order components, custom hooks, and performance optimization techniques.',
    content: `# Advanced React Patterns and Best Practices

React has evolved significantly over the years, and with it, the patterns and best practices have also matured. Let's explore some advanced patterns that can make your React applications more maintainable and performant.

## Custom Hooks

Custom hooks are a powerful way to extract component logic into reusable functions.

\`\`\`javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
\`\`\`

## Performance Optimization

### React.memo
Use React.memo to prevent unnecessary re-renders:

\`\`\`javascript
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* expensive rendering */}</div>;
});
\`\`\`

### useMemo and useCallback
Optimize expensive calculations and function references:

\`\`\`javascript
const MemoizedComponent = ({ items }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  const handleClick = useCallback((id) => {
    // handle click
  }, []);

  return <div>{/* component */}</div>;
};
\`\`\`

These patterns help create more efficient and maintainable React applications.`,
    date: '2024-01-05',
    readTime: '10 min read',
    category: 'Frontend',
    author: 'Dilip Singh',
    slug: 'advanced-react-patterns',
    featured: false,
    tags: ['React', 'JavaScript', 'Performance', 'Hooks'],
    published: true,
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z',
  },
  {
    id: '4',
    title: 'Building RESTful APIs with Node.js and Express',
    excerpt: 'A complete guide to building scalable and maintainable RESTful APIs using Node.js, Express, and modern JavaScript features.',
    content: `# Building RESTful APIs with Node.js and Express

Creating robust and scalable RESTful APIs is a crucial skill for backend developers. Let's explore how to build professional-grade APIs using Node.js and Express.

## Project Structure

\`\`\`
src/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
└── app.js
\`\`\`

## Basic Express Setup

\`\`\`javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
\`\`\`

## Best Practices

- Use proper HTTP status codes
- Implement input validation
- Add authentication and authorization
- Use environment variables for configuration
- Implement proper error handling
- Add logging and monitoring
- Write comprehensive tests

Following these practices ensures your APIs are secure, scalable, and maintainable.`,
    date: '2023-12-28',
    readTime: '15 min read',
    category: 'Backend',
    author: 'Dilip Singh',
    slug: 'restful-apis-nodejs-express',
    featured: false,
    tags: ['Node.js', 'Express', 'API', 'Backend', 'JavaScript'],
    published: true,
    createdAt: '2023-12-28T10:00:00Z',
    updatedAt: '2023-12-28T10:00:00Z',
  },
  {
    id: '5',
    title: 'Docker and Kubernetes for Modern Development',
    excerpt: 'Learn how to containerize applications with Docker and orchestrate them with Kubernetes for scalable deployments.',
    content: `# Docker and Kubernetes for Modern Development

Containerization has revolutionized how we deploy and manage applications. Docker and Kubernetes provide powerful tools for creating scalable, maintainable deployments.

## Docker Basics

### Dockerfile Example
\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

### Docker Compose
\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
  
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
\`\`\`

## Kubernetes Deployment

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 3000
\`\`\`

## Benefits

- **Consistency**: Same environment across development, staging, and production
- **Scalability**: Easy horizontal scaling
- **Isolation**: Applications run in isolated environments
- **Portability**: Run anywhere Docker is supported

Containerization is essential for modern application deployment and management.`,
    date: '2023-12-20',
    readTime: '12 min read',
    category: 'DevOps',
    author: 'Dilip Singh',
    slug: 'docker-kubernetes-development',
    featured: false,
    tags: ['Docker', 'Kubernetes', 'DevOps', 'Containers', 'Deployment'],
    published: true,
    createdAt: '2023-12-20T10:00:00Z',
    updatedAt: '2023-12-20T10:00:00Z',
  },
];

// Helper functions
export const getFeaturedPosts = (): BlogPost[] => {
  return BLOG_POSTS.filter(post => post.featured && post.published);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  if (category === 'All') {
    return BLOG_POSTS.filter(post => post.published);
  }
  return BLOG_POSTS.filter(post => post.category === category && post.published);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return BLOG_POSTS.find(post => post.slug === slug && post.published);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(BLOG_POSTS.map(post => post.category));
  return ['All', ...Array.from(categories)];
};

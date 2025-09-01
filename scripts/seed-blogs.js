const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Blog Schema
const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  readTime: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  image: {
    type: String,
    trim: true,
  },
  published: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

// Helper function to generate slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Sample blog posts
const samplePosts = [
  {
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
    title: 'Optimizing React Performance with TypeScript',
    excerpt: 'Best practices for improving React application performance using TypeScript and modern optimization techniques. Learn about code splitting, lazy loading, and more.',
    content: `# Optimizing React Performance with TypeScript

Performance optimization is crucial for providing a smooth user experience. This guide covers advanced techniques for optimizing React applications with TypeScript.

## Key Optimization Techniques

### 1. Code Splitting
\`\`\`typescript
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

### 2. Memoization
\`\`\`typescript
import { memo, useMemo, useCallback } from 'react';

const ExpensiveComponent = memo(({ data }: { data: string[] }) => {
  const processedData = useMemo(() => {
    return data.filter(item => item.length > 5);
  }, [data]);

  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return (
    <div>
      {processedData.map(item => (
        <div key={item}>{item}</div>
      ))}
      <button onClick={handleClick}>Click me</button>
    </div>
  );
});
\`\`\`

### 3. Virtual Scrolling
For large lists, implement virtual scrolling to render only visible items.

## Performance Monitoring

Use tools like:
- React DevTools Profiler
- Lighthouse
- WebPageTest
- Bundle Analyzer

Regular performance audits help maintain optimal application speed.`,
    date: '2024-01-05',
    readTime: '10 min read',
    category: 'Performance',
    author: 'Dilip Singh',
    slug: 'react-typescript-performance',
    featured: false,
    tags: ['React', 'TypeScript', 'Performance', 'Optimization'],
    published: true,
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z',
  },
];

async function seedBlogs() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'portfolio';

    if (!MONGODB_URI) {
      console.error('MONGODB_URI environment variable is required');
      process.exit(1);
    }

    await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB_NAME,
    });

    console.log('Connected to MongoDB');

    // Clear existing blog posts
    await Blog.deleteMany({});
    console.log('Cleared existing blog posts');

    // Insert sample posts
    const insertedPosts = await Blog.insertMany(samplePosts);
    console.log(`Inserted ${insertedPosts.length} blog posts`);

    // Display inserted posts
    insertedPosts.forEach(post => {
      console.log(`- ${post.title} (${post.slug})`);
    });

    console.log('Blog seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding blogs:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seeding function
seedBlogs();

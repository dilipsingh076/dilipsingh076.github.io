import { BlogPost } from '@/store/slices/blogSlice';
import { ContactSubmission } from '@/store/slices/contactSlice';

// Shared data storage for API routes
export const blogPosts: BlogPost[] = [
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
  {
    id: '4',
    title: 'Building Real-time Chat Applications with Socket.io',
    excerpt: 'Step-by-step guide to creating real-time chat applications using Socket.io, WebRTC, and React. Includes authentication, message persistence, and file sharing.',
    content: `# Building Real-time Chat Applications with Socket.io

Real-time communication is essential for modern applications. Socket.io provides a robust foundation for building real-time features like chat, notifications, and live updates.

## Setup Socket.io Server

\`\`\`javascript
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('send_message', (data) => {
    socket.to(data.roomId).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
\`\`\`

## React Client Implementation

\`\`\`typescript
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function ChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.emit('join_room', roomId);

    socket.on('receive_message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim()) {
      const messageData = {
        roomId,
        message,
        author: 'User',
        time: new Date().toISOString(),
      };
      socket.emit('send_message', messageData);
      setMessage('');
    }
  };

  return (
    <div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg.author}: {msg.message}</div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
\`\`\`

## Advanced Features

- **File Sharing**: Implement drag-and-drop file uploads
- **Typing Indicators**: Show when users are typing
- **Read Receipts**: Track message delivery and read status
- **Push Notifications**: Notify users of new messages

Real-time features significantly enhance user engagement and experience.`,
    date: '2023-12-28',
    readTime: '15 min read',
    category: 'Real-time',
    author: 'Dilip Singh',
    slug: 'real-time-chat-socketio',
    featured: false,
    tags: ['Socket.io', 'Real-time', 'React', 'WebRTC'],
    published: true,
    createdAt: '2023-12-28T10:00:00Z',
    updatedAt: '2023-12-28T10:00:00Z',
  },
  {
    id: '5',
    title: 'Mastering Next.js 14: New Features and Best Practices',
    excerpt: 'Explore the latest features in Next.js 14 including the new app router, server components, and improved performance optimizations.',
    content: `# Mastering Next.js 14: New Features and Best Practices

Next.js 14 introduces groundbreaking features that revolutionize how we build React applications. This guide covers the most important updates and best practices.

## Key Features in Next.js 14

### 1. App Router (Stable)
The app router is now stable and provides a more intuitive file-system based routing system.

\`\`\`typescript
// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return <article>{post.content}</article>;
}
\`\`\`

### 2. Server Components
Server components reduce client-side JavaScript and improve performance.

\`\`\`typescript
// This component runs on the server
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data');
  const items = await data.json();
  
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

### 3. Partial Prerendering
Next.js 14 introduces partial prerendering, which combines static and dynamic content.

### 4. Improved Image Component
Enhanced image optimization with better performance.

## Best Practices

1. **Use Server Components by Default**: Only use client components when necessary
2. **Implement Proper Error Boundaries**: Handle errors gracefully
3. **Optimize Images**: Use the Next.js Image component
4. **Leverage Caching**: Implement proper caching strategies
5. **Monitor Performance**: Use built-in analytics

Next.js 14 sets a new standard for React application development.`,
    date: '2023-12-20',
    readTime: '14 min read',
    category: 'Next.js',
    author: 'Dilip Singh',
    slug: 'nextjs-14-features',
    featured: false,
    tags: ['Next.js', 'React', 'App Router', 'Server Components'],
    published: true,
    createdAt: '2023-12-20T10:00:00Z',
    updatedAt: '2023-12-20T10:00:00Z',
  },
  {
    id: '6',
    title: 'The Future of Web Development: What to Expect in 2024',
    excerpt: 'Predictions and insights about upcoming trends in web development, including new frameworks, tools, and methodologies.',
    content: `# The Future of Web Development: What to Expect in 2024

As we approach 2024, the web development landscape continues to evolve rapidly. Here are the key trends and technologies that will shape the future of web development.

## Emerging Trends

### 1. AI-Powered Development
AI tools are becoming integral to the development workflow:
- **GitHub Copilot**: AI-powered code completion
- **ChatGPT**: Code generation and debugging assistance
- **AI-powered testing**: Automated test generation

### 2. WebAssembly (WASM)
WebAssembly is gaining traction for performance-critical applications:
- **Rust + WASM**: High-performance web applications
- **C++ to WASM**: Legacy code migration
- **WASM in Edge Computing**: Serverless functions

### 3. Edge Computing
Edge computing is revolutionizing how we deploy applications:
- **Vercel Edge Functions**: Serverless at the edge
- **Cloudflare Workers**: Global edge computing
- **Edge Databases**: Distributed data storage

### 4. Progressive Web Apps (PWAs)
PWAs continue to gain popularity:
- **Offline-first applications**
- **Native app-like experience**
- **Push notifications**

## Technology Predictions

### Frameworks
- **Next.js**: Continued dominance with app router
- **Remix**: Growing adoption for full-stack applications
- **SvelteKit**: Rising popularity for performance-focused apps

### Tools
- **Turbopack**: Faster bundling with Webpack replacement
- **Bun**: All-in-one JavaScript runtime
- **Deno**: Secure runtime with TypeScript support

## Skills to Develop

1. **AI/ML Integration**: Understanding AI tools and APIs
2. **Performance Optimization**: Core Web Vitals and optimization
3. **Security**: Web security best practices
4. **Accessibility**: Inclusive design principles
5. **Edge Computing**: Distributed application architecture

The future of web development is exciting and full of opportunities for innovation.`,
    date: '2023-12-15',
    readTime: '6 min read',
    category: 'Trends',
    author: 'Dilip Singh',
    slug: 'web-development-2024',
    featured: false,
    tags: ['Web Development', 'Trends', 'AI', 'WASM', 'Edge Computing'],
    published: true,
    createdAt: '2023-12-15T10:00:00Z',
    updatedAt: '2023-12-15T10:00:00Z',
  },
];

export const contactSubmissions: ContactSubmission[] = [];

// Helper functions
export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

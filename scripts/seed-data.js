const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'portfolio';

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

// Sample data
const SKILLS = [
  // Frontend
  { name: 'React.js', icon: 'react', category: 'frontend', proficiency: 95 },
  { name: 'Next.js', icon: 'nextjs', category: 'frontend', proficiency: 90 },
  { name: 'TypeScript', icon: 'typescript', category: 'frontend', proficiency: 88 },
  { name: 'JavaScript', icon: 'javascript', category: 'frontend', proficiency: 92 },
  { name: 'Redux', icon: 'redux', category: 'frontend', proficiency: 85 },
  { name: 'React Native', icon: 'reactnative', category: 'frontend', proficiency: 80 },
  { name: 'HTML5', icon: 'html5', category: 'frontend', proficiency: 95 },
  { name: 'CSS3', icon: 'css3', category: 'frontend', proficiency: 90 },
  { name: 'SASS', icon: 'sass', category: 'frontend', proficiency: 85 },
  { name: 'Tailwind CSS', icon: 'tailwind', category: 'frontend', proficiency: 88 },
  { name: 'Bootstrap', icon: 'bootstrap', category: 'frontend', proficiency: 85 },
  { name: 'Material UI', icon: 'materialui', category: 'frontend', proficiency: 80 },
  { name: 'React JSON Schema Form', icon: 'react', category: 'frontend', proficiency: 85 },
  { name: 'Single SPA React', icon: 'react', category: 'frontend', proficiency: 80 },

  // Backend
  { name: 'Node.js', icon: 'nodejs', category: 'backend', proficiency: 88 },
  { name: 'Express.js', icon: 'express', category: 'backend', proficiency: 85 },
  { name: 'Python', icon: 'python', category: 'backend', proficiency: 75 },
  { name: 'FastAPI', icon: 'fastapi', category: 'backend', proficiency: 70 },
  { name: 'REST API', icon: 'api', category: 'backend', proficiency: 90 },
  { name: 'GraphQL', icon: 'graphql', category: 'backend', proficiency: 80 },
  { name: 'Firebase', icon: 'firebase', category: 'backend', proficiency: 75 },
  { name: 'Supabase', icon: 'supabase', category: 'backend', proficiency: 70 },

  // Database
  { name: 'MongoDB', icon: 'mongodb', category: 'database', proficiency: 85 },

  // DevOps & Tools
  { name: 'Git', icon: 'git', category: 'devops', proficiency: 90 },
  { name: 'GitHub', icon: 'github', category: 'devops', proficiency: 90 },
  { name: 'Docker', icon: 'docker', category: 'devops', proficiency: 75 },
  { name: 'Vercel', icon: 'vercel', category: 'devops', proficiency: 85 },
  { name: 'CLI (Bash)', icon: 'terminal', category: 'devops', proficiency: 80 },
  { name: 'Version Control', icon: 'git', category: 'devops', proficiency: 90 },
];

const PROJECTS = [
  {
    title: 'Intelligage.io',
    description: 'AI-powered insights platform built with React.js and GraphQL. Leading the development of intelligent analytics dashboard with real-time data visualization and AI-driven insights.',
    image: '/images/portfolio.png',
    technologies: ['React.js', 'GraphQL', 'TypeScript', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/dilipsingh076/intelligage',
    liveUrl: 'https://intelligage.io',
    featured: true,
    category: 'Web App',
  },
  {
    title: 'PDMI Project',
    description: 'Comprehensive project management system using React.js with micro frontends (single-spa-react). Integrated RESTful APIs and react-jsonschema-form for dynamic form handling.',
    image: '/images/portfolio.png',
    technologies: ['React.js', 'Single SPA', 'REST API', 'React JSON Schema Form', 'Node.js'],
    githubUrl: 'https://github.com/dilipsingh076/pdmi',
    liveUrl: 'https://pdmi-project.com',
    featured: true,
    category: 'Dashboard',
  },
  {
    title: 'Infiniti Possibilities',
    description: 'AI-based application allowing users to search queries across multiple LLM models from a single interface. Modernized legacy codebase with user-friendly UI for multi-model results.',
    image: '/images/portfolio.png',
    technologies: ['React.js', 'AI/ML', 'TypeScript', 'Node.js', 'FastAPI'],
    githubUrl: 'https://github.com/dilipsingh076/infiniti',
    liveUrl: 'https://infiniti-possibilities.com',
    featured: true,
    category: 'AI/ML',
  },
  {
    title: 'Waltz AI',
    description: 'Implemented Cal.com API integration for seamless meeting scheduling with Google Calendar and Zoom connectivity. Built dynamic availability management and timezone handling.',
    image: '/images/portfolio.png',
    technologies: ['React.js', 'Cal.com API', 'Google Calendar', 'Zoom API', 'Node.js'],
    githubUrl: 'https://github.com/dilipsingh076/waltz-ai',
    liveUrl: 'https://waltz-ai.com',
    featured: false,
    category: 'Web App',
  },
  {
    title: 'All Talk Chat',
    description: 'Real-time chat application supporting one-on-one text, audio, and video communication using Socket.io and WebRTC. Features room-based architecture with gender-based filtering.',
    image: '/images/portfolio.png',
    technologies: ['React.js', 'Socket.io', 'WebRTC', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/dilipsingh076/all-talk-chat',
    liveUrl: 'https://all-talk-chat.com',
    featured: false,
    category: 'Real-time',
  },
  {
    title: 'CFA Art College',
    description: 'Web application for College of Fine Arts, Bengaluru, managing student enrollments, faculty details, courses, and gallery showcases. Role-based access with responsive design.',
    image: '/images/portfolio.png',
    technologies: ['React.js', 'Node.js', 'MongoDB', 'Express', 'Bootstrap'],
    githubUrl: 'https://github.com/dilipsingh076/cfa-art',
    liveUrl: 'https://cfa-art-college.com',
    featured: false,
    category: 'Web App',
  },
  {
    title: 'Ideakart Clone',
    description: 'Innovative book-selling website aggregating listings from Flipkart, Amazon, and other platforms. Simplifies book search process with consolidated options.',
    image: '/images/ideakart.png',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
    githubUrl: 'https://github.com/POPEYE-jpg/Ideakart',
    liveUrl: 'https://ideakkart-clone.netlify.app/',
    featured: false,
    category: 'E-commerce',
  },
  {
    title: 'Zara Clone',
    description: 'E-commerce website for fashion retail, specializing in fast fashion with clothing, accessories, shoes, and beauty products.',
    image: '/images/zara.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Node.js'],
    githubUrl: 'https://github.com/ashelake/truculent-pie-36',
    liveUrl: 'https://zaranew-clone.netlify.app/',
    featured: false,
    category: 'E-commerce',
  },
];

// Define schemas
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  icon: { type: String, required: true },
  category: { type: String, required: true, enum: ['frontend', 'backend', 'database', 'devops', 'tools'] },
  proficiency: { type: Number, required: true, min: 0, max: 100 },
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  technologies: [{ type: String }],
  githubUrl: { type: String, required: true },
  liveUrl: { type: String, required: true },
  featured: { type: Boolean, default: false },
  category: { type: String, required: true },
}, { timestamps: true });

// Create models
const Skill = mongoose.model('Skill', skillSchema);
const Project = mongoose.model('Project', projectSchema);

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB_NAME,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Skill.deleteMany({});
    await Project.deleteMany({});
    console.log('Cleared existing data');

    // Seed skills
    await Skill.insertMany(SKILLS);
    console.log(`Seeded ${SKILLS.length} skills`);

    // Seed projects
    await Project.insertMany(PROJECTS);
    console.log(`Seeded ${PROJECTS.length} projects`);

    console.log('Data seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedData();

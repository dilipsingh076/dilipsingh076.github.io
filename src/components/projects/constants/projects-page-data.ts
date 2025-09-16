// Projects Page Data for Projects Route
import { FiExternalLink, FiGithub, FiFilter, FiCode, FiEye, FiArrowRight, FiCalendar, FiClock } from 'react-icons/fi';

// Project Type Definition
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Project Categories
export const PROJECT_CATEGORIES = ['All', 'Web App', 'Mobile App', 'E-commerce', 'Dashboard', 'AI/ML', 'Real-time'];

// Page Content Data
export const PROJECTS_PAGE_CONTENT = {
  header: {
    title: 'My Projects',
    subtitle: 'A collection of projects showcasing my skills in full-stack development, from concept to deployment. Each project represents a unique challenge and solution.',
  },
  
  filter: {
    noProjectsFound: {
      title: 'No projects found',
      description: 'No projects match the selected category. Try selecting a different filter.',
    },
  },
  
  statistics: {
    totalProjects: 'Total Projects',
    featuredProjects: 'Featured Projects',
    technologiesUsed: 'Technologies Used',
    yearsExperience: 'Years Experience',
  },
  
  callToAction: {
    title: 'Have a project in mind?',
    description: 'Let\'s work together to bring your ideas to life. I\'m always excited to take on new challenges and create innovative solutions.',
    button: {
      text: 'Start a Project',
      href: '/contact',
      icon: 'FiExternalLink',
    },
  },
  
  project: {
    featured: 'Featured',
    liveDemo: 'Live Demo',
    code: 'Code',
    viewDetails: 'View Details',
    moreTechnologies: 'more',
    readMore: 'Read More',
    createdAt: 'Created',
    updatedAt: 'Updated',
  },
};

// Project Action Icons
export const PROJECT_ACTION_ICONS = {
  externalLink: FiExternalLink,
  github: FiGithub,
  code: FiCode,
  eye: FiEye,
  filter: FiFilter,
  arrowRight: FiArrowRight,
  calendar: FiCalendar,
  clock: FiClock,
};

// Projects Data (Fallback/Dummy Data)
export const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: 'Intelligage.io',
    description: 'AI-powered insights platform built with React.js and GraphQL. Leading the development of intelligent analytics dashboard with real-time data visualization and AI-driven insights.',
    image: '/images/portfolio.png',
    technologies: ['React.js', 'GraphQL', 'TypeScript', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/dilipsingh076/intelligage',
    liveUrl: 'https://intelligage.io',
    featured: true,
    category: 'Web App',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20',
  },
  {
    id: '2',
    title: 'PDMI Project',
    description: 'Comprehensive project management system using React.js with micro frontends (single-spa-react). Integrated RESTful APIs and react-jsonschema-form for dynamic form handling.',
    image: '/images/portfolio.png',
    technologies: ['React.js', 'Single SPA', 'REST API', 'React JSON Schema Form', 'Node.js'],
    githubUrl: 'https://github.com/dilipsingh076/pdmi',
    liveUrl: 'https://pdmi-project.com',
    featured: true,
    category: 'Dashboard',
    createdAt: '2023-11-10',
    updatedAt: '2024-02-15',
  },
  {
    id: '3',
    title: 'Infiniti Possibilities',
    description: 'AI-based application allowing users to search queries across multiple LLM models from a single interface. Modernized legacy codebase with user-friendly UI for multi-model results.',
    image: '/images/portfolio.png',
    technologies: ['React.js', 'AI/ML', 'TypeScript', 'Node.js', 'FastAPI'],
    githubUrl: 'https://github.com/dilipsingh076/infiniti',
    liveUrl: 'https://infiniti-possibilities.com',
    featured: true,
    category: 'AI/ML',
    createdAt: '2023-12-05',
    updatedAt: '2024-01-30',
  },
  {
    id: '4',
    title: 'Waltz AI',
    description: 'Implemented Cal.com API integration for seamless meeting scheduling with Google Calendar and Zoom connectivity. Built dynamic availability management and timezone handling.',
    image: '/images/portfolio.png',
    technologies: ['React.js', 'Cal.com API', 'Google Calendar', 'Zoom API', 'Node.js'],
    githubUrl: 'https://github.com/dilipsingh076/waltz-ai',
    liveUrl: 'https://waltz-ai.com',
    featured: false,
    category: 'Web App',
    createdAt: '2023-10-20',
    updatedAt: '2024-01-10',
  },
  {
    id: '5',
    title: 'All Talk Chat',
    description: 'Real-time chat application supporting one-on-one text, audio, and video communication using Socket.io and WebRTC. Features room-based architecture with gender-based filtering.',
    image: '/images/portfolio.png',
    technologies: ['React.js', 'Socket.io', 'WebRTC', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/dilipsingh076/all-talk-chat',
    liveUrl: 'https://all-talk-chat.com',
    featured: false,
    category: 'Real-time',
    createdAt: '2023-09-15',
    updatedAt: '2023-12-20',
  },
  {
    id: '6',
    title: 'CFA Art College',
    description: 'Web application for College of Fine Arts, Bengaluru, managing student enrollments, faculty details, courses, and gallery showcases. Role-based access with responsive design.',
    image: '/images/portfolio.png',
    technologies: ['React.js', 'Node.js', 'MongoDB', 'Express', 'Bootstrap'],
    githubUrl: 'https://github.com/dilipsingh076/cfa-art',
    liveUrl: 'https://cfa-art-college.com',
    featured: false,
    category: 'Web App',
    createdAt: '2023-08-10',
    updatedAt: '2023-11-25',
  },
  {
    id: '7',
    title: 'Ideakart Clone',
    description: 'Innovative book-selling website aggregating listings from Flipkart, Amazon, and other platforms. Simplifies book search process with consolidated options.',
    image: '/images/ideakart.png',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
    githubUrl: 'https://github.com/POPEYE-jpg/Ideakart',
    liveUrl: 'https://ideakkart-clone.netlify.app/',
    featured: false,
    category: 'E-commerce',
    createdAt: '2023-07-05',
    updatedAt: '2023-10-15',
  },
  {
    id: '8',
    title: 'Zara Clone',
    description: 'E-commerce website for fashion retail, specializing in fast fashion with clothing, accessories, shoes, and beauty products.',
    image: '/images/zara.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Node.js'],
    githubUrl: 'https://github.com/ashelake/truculent-pie-36',
    liveUrl: 'https://zaranew-clone.netlify.app/',
    featured: false,
    category: 'E-commerce',
    createdAt: '2023-06-20',
    updatedAt: '2023-09-30',
  },
];

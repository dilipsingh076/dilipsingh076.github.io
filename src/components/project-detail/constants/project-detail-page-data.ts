// Project Detail Page Data for Project Detail Route
import { FiExternalLink, FiGithub, FiArrowLeft } from 'react-icons/fi';

// Page Content Data
export const PROJECT_DETAIL_PAGE_CONTENT = {
  notFound: {
    title: 'Project Not Found',
    description: 'The project you\'re looking for doesn\'t exist.',
    button: {
      text: 'Back to Projects',
      href: '/projects',
      icon: 'FiArrowLeft',
    },
  },
  
  actions: {
    liveDemo: {
      text: 'Live Demo',
      icon: 'FiExternalLink',
    },
    viewCode: {
      text: 'View Code',
      icon: 'FiGithub',
    },
  },
  
  sections: {
    technologies: {
      title: 'Technologies Used',
    },
    projectDetails: {
      title: 'Project Details',
    },
    keyFeatures: {
      title: 'Key Features',
    },
  },
  
  badges: {
    featured: 'Featured',
  },
};

// Project-specific content
export const PROJECT_SPECIFIC_CONTENT = {
  'Intelligage.io': {
    keyFeatures: [
      'AI-powered insights and analytics dashboard',
      'Real-time data visualization',
      'GraphQL API integration',
      'TypeScript for type safety',
      'Responsive design for all devices',
    ],
  },
  'PDMI Project': {
    keyFeatures: [
      'Micro frontend architecture using Single SPA',
      'Dynamic form handling with React JSON Schema Form',
      'RESTful API integration',
      'Scalable project management system',
      'Role-based access control',
    ],
  },
  'Infiniti Possibilities': {
    keyFeatures: [
      'Multi-LLM model query interface',
      'Legacy codebase modernization',
      'AI/ML integration',
      'User-friendly results display',
      'FastAPI backend integration',
    ],
  },
  'Waltz AI': {
    keyFeatures: [
      'Cal.com API integration',
      'Google Calendar connectivity',
      'Zoom meeting scheduling',
      'Dynamic availability management',
      'Timezone handling',
    ],
  },
  'All Talk Chat': {
    keyFeatures: [
      'Real-time text, audio, and video communication',
      'Socket.io for real-time messaging',
      'WebRTC for peer-to-peer connections',
      'Room-based architecture',
      'Gender-based filtering system',
    ],
  },
  'CFA Art College': {
    keyFeatures: [
      'Student enrollment management',
      'Faculty details and course management',
      'Gallery showcase system',
      'Role-based access control',
      'Responsive design for all devices',
    ],
  },
  'Ideakart Clone': {
    keyFeatures: [
      'Book aggregation from multiple platforms',
      'Flipkart and Amazon integration',
      'Simplified book search process',
      'Consolidated listing options',
      'User-friendly interface',
    ],
  },
  'Zara Clone': {
    keyFeatures: [
      'Fashion retail e-commerce platform',
      'Fast fashion product catalog',
      'Stripe payment integration',
      'Responsive design with Tailwind CSS',
      'TypeScript for type safety',
    ],
  },
};

// Action Icons
export const PROJECT_DETAIL_ACTION_ICONS = {
  externalLink: FiExternalLink,
  github: FiGithub,
  arrowLeft: FiArrowLeft,
};

// Skills Section Data for MainDashboard
import { FiCode, FiDatabase, FiServer, FiCloud, FiTool, FiTrendingUp } from 'react-icons/fi';

// Category Filter Data
export const SKILL_CATEGORIES = [
  { id: 'all', label: 'All Skills', icon: FiCode, count: 0 },
  { id: 'frontend', label: 'Frontend', icon: FiCode, count: 0 },
  { id: 'backend', label: 'Backend', icon: FiServer, count: 0 },
  { id: 'database', label: 'Database', icon: FiDatabase, count: 0 },
  { id: 'devops', label: 'DevOps', icon: FiCloud, count: 0 },
  { id: 'tools', label: 'Tools', icon: FiTool, count: 0 },
];

// Section Content Data
export const SKILLS_CONTENT = {
  badge: {
    icon: FiTrendingUp,
    text: 'Technical Expertise',
  },
  title: 'Skills & Technologies',
  subtitle: 'I\'ve worked with a diverse range of technologies and tools throughout my career.',
  description: 'Here\'s a comprehensive overview of my technical proficiency.',
  
  loading: {
    text: 'Loading skills...',
  },
  
  proficiency: {
    labels: {
      expert: 'Expert',
      advanced: 'Advanced',
      intermediate: 'Intermediate',
      beginner: 'Beginner',
    },
    thresholds: {
      expert: 90,
      advanced: 75,
      intermediate: 60,
    },
  },
  
  stats: {
    technologies: 'Technologies',
    average: 'Average',
    expertLevel: 'Expert Level',
    categories: 'Categories',
  },
  
  button: {
    text: 'View All Skills',
    href: '/skills',
  },
};

// Proficiency Color Classes
export const PROFICIENCY_COLORS = {
  expert: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  advanced: 'text-blue-600 bg-blue-50 border-blue-200',
  intermediate: 'text-amber-600 bg-amber-50 border-amber-200',
  beginner: 'text-gray-600 bg-gray-50 border-gray-200',
};

// Progress Bar Colors
export const PROGRESS_COLORS = {
  expert: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
  advanced: 'bg-gradient-to-r from-blue-500 to-blue-600',
  intermediate: 'bg-gradient-to-r from-amber-500 to-amber-600',
  beginner: 'bg-gradient-to-r from-gray-500 to-gray-600',
};

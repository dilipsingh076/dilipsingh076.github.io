// Skills Page Data for Skills Route
import { FiArrowLeft, FiCode, FiDatabase, FiCloud, FiSmartphone, FiMonitor, FiTrendingUp } from 'react-icons/fi';

// API Response Interface
export interface SkillsApiResponse {
  categories: SkillCategory[];
  overview: Skill[];
}

// Skill Category Interface (matches API structure)
export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    proficiency: number;
  }[];
}

// Skill Interface
export interface Skill {
  name: string;
  proficiency: number;
}

// Page Content Data
export const SKILLS_PAGE_CONTENT = {
  header: {
    title: 'Technical Skills',
    subtitle: 'A comprehensive overview of my technical expertise and proficiency levels across various technologies and frameworks. I\'m constantly learning and expanding my skill set.',
  },
  
  sections: {
    overview: {
      title: 'Skills Overview',
    },
    breakdown: {
      title: 'Skills Breakdown',
    },
    experience: {
      title: 'Experience Summary',
    },
    learning: {
      title: 'My Learning Journey',
    },
  },
  
  experience: {
    years: 'Years Experience',
    projects: 'Projects Completed',
    technologies: 'Technologies Mastered',
  },
  
  learning: {
    continuous: {
      title: 'Continuous Learning',
      description: 'I believe in staying updated with the latest technologies and best practices. I regularly participate in online courses, attend conferences, and contribute to open-source projects.',
    },
    problemSolving: {
      title: 'Problem Solving',
      description: 'I enjoy tackling complex technical challenges and finding elegant solutions. My experience spans from simple web applications to complex enterprise systems.',
    },
  },
  
  callToAction: {
    title: 'Ready to collaborate?',
    description: 'I\'m always learning and expanding my skill set. Let\'s discuss how I can contribute to your next project.',
    button: {
      text: 'Let\'s Talk',
      href: '/contact',
    },
  },
  
  navigation: {
    backToHome: 'Back to Home',
  },
};

// Skill Categories Data (matches API structure)
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React.js', proficiency: 95 },
      { name: 'Next.js', proficiency: 90 },
      { name: 'TypeScript', proficiency: 88 },
      { name: 'JavaScript (ES6+)', proficiency: 92 },
      { name: 'HTML5 & CSS3', proficiency: 95 },
      { name: 'Tailwind CSS', proficiency: 90 },
      { name: 'Redux/Zustand', proficiency: 85 },
      { name: 'GraphQL', proficiency: 80 },
    ]
  },
  {
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', proficiency: 88 },
      { name: 'Express.js', proficiency: 85 },
      { name: 'Python', proficiency: 80 },
      { name: 'Django', proficiency: 75 },
      { name: 'RESTful APIs', proficiency: 90 },
      { name: 'Microservices', proficiency: 82 },
      { name: 'Authentication', proficiency: 85 },
      { name: 'JWT', proficiency: 88 },
    ]
  },
  {
    title: 'Database & Cloud',
    skills: [
      { name: 'MongoDB', proficiency: 85 },
      { name: 'PostgreSQL', proficiency: 80 },
      { name: 'Redis', proficiency: 75 },
      { name: 'AWS', proficiency: 78 },
      { name: 'Docker', proficiency: 80 },
      { name: 'CI/CD', proficiency: 75 },
      { name: 'Kubernetes', proficiency: 70 },
      { name: 'Serverless', proficiency: 72 },
    ]
  },
  {
    title: 'Mobile Development',
    skills: [
      { name: 'React Native', proficiency: 80 },
      { name: 'Expo', proficiency: 75 },
      { name: 'Mobile UI/UX', proficiency: 78 },
      { name: 'App Store Deployment', proficiency: 70 },
      { name: 'Push Notifications', proficiency: 75 },
      { name: 'Offline Storage', proficiency: 72 },
    ]
  },
  {
    title: 'Tools & Technologies',
    skills: [
      { name: 'Git & GitHub', proficiency: 90 },
      { name: 'VS Code', proficiency: 95 },
      { name: 'Figma', proficiency: 75 },
      { name: 'Postman', proficiency: 85 },
      { name: 'Jest & Testing', proficiency: 80 },
      { name: 'Webpack/Vite', proficiency: 78 },
      { name: 'NPM/Yarn', proficiency: 90 },
      { name: 'Linux/Unix', proficiency: 80 },
    ]
  }
];

// Skills Overview Data (matches API structure exactly)
export const SKILLS_OVERVIEW: Skill[] = [
  { name: 'React.js', proficiency: 95 },
  { name: 'Next.js', proficiency: 90 },
  { name: 'TypeScript', proficiency: 88 },
  { name: 'JavaScript', proficiency: 92 },
  { name: 'Node.js', proficiency: 88 },
  { name: 'MongoDB', proficiency: 85 },
  { name: 'Express.js', proficiency: 85 },
  { name: 'Python', proficiency: 80 },
  { name: 'AWS', proficiency: 78 },
  { name: 'Docker', proficiency: 80 },
  { name: 'Git', proficiency: 90 },
  { name: 'VS Code', proficiency: 95 },
];

// Experience Statistics
export const EXPERIENCE_STATS = {
  years: 5,
  projects: 50,
  technologies: 20,
};

// Category Icons Mapping (for UI display)
export const CATEGORY_ICONS = {
  'Frontend Development': FiMonitor,
  'Backend Development': FiCode,
  'Database & Cloud': FiDatabase,
  'Mobile Development': FiSmartphone,
  'Tools & Technologies': FiCloud,
};

// Action Icons
export const SKILLS_ACTION_ICONS = {
  arrowLeft: FiArrowLeft,
  trendingUp: FiTrendingUp,
  code: FiCode,
};

import { Experience, Education, Achievement } from '@/types';

// Professional Experience Data for MainDashboard
export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    title: 'Front-end Developer',
    company: 'Declone Labs P.V.T L.T.D',
    duration: 'June 2023 - Present',
    description: [
      'Led the upgrade and modernization of the Infiniti Possibilities project, an AI-based application for multi-LLM model queries',
      'Handled legacy codebase upgrades to meet new business and technical requirements',
      'Redesigned and developed user-friendly UI for displaying results from multiple AI models',
      'Collaborated with AI specialists to ensure interface alignment with different model capabilities',
      'Implemented Cal.com API integration in Waltz AI for seamless meeting scheduling with Google Calendar and Zoom',
      'Built dynamic availability and scheduling logic with timezone handling and conflict resolution',
      'Optimized scheduling workflows and calendar synchronization within the platform',
    ],
    technologies: ['React.js', 'AI/ML', 'TypeScript', 'Cal.com API', 'GraphQL', 'FastAPI', 'Node.js'],
  },
  {
    id: '2',
    title: 'Front-end Developer',
    company: 'Glory AutoTech LLP',
    duration: 'Nov 2022 - May 2023',
    description: [
      'Led the intelligage.io project in React.js to unlock AI insights with GraphQL API integration',
      'Developed new pages and features, including the product dashboard',
      'Optimized playbooks in real-time using Gong and Zoom calls',
      'Led PDMI project using React.js, integrating RESTful APIs and micro frontends (single-spa-react)',
      'Built and optimized features, pages, and forms with react-jsonschema-form',
      'Improved UX with responsive interfaces and claim testing tools for faster processing',
      'Collaborated with teams, conducted code reviews, and mentored junior developers',
    ],
    technologies: ['React.js', 'GraphQL', 'Single SPA', 'REST API', 'React JSON Schema Form', 'Node.js'],
  },
];

// Education Data for MainDashboard
export const EDUCATION: Education[] = [
  {
    id: '1',
    degree: 'Full Stack Development',
    institution: 'Masai School, Bangalore',
    duration: 'Feb 2022 - Nov 2022',
    description: 'Intensive bootcamp covering modern web development technologies and best practices.',
  },
  {
    id: '2',
    degree: 'Bachelor of Arts',
    institution: 'MSBU University of Rajasthan',
    duration: '2016 - 2019',
    description: 'Completed undergraduate studies with focus on liberal arts and humanities.',
  },
  {
    id: '3',
    degree: 'Higher Secondary Certificate',
    institution: 'RBSE Board, Rajasthan',
    duration: '2015 - 2016',
    description: 'Completed higher secondary education with distinction.',
  },
  {
    id: '4',
    degree: 'Senior Secondary Certificate',
    institution: 'RBSE Board, Rajasthan',
    duration: '2012 - 2013',
    description: 'Completed senior secondary education with academic excellence.',
  },
];

// Achievements Data for MainDashboard
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: '5+ Years Experience',
    description: 'Successfully delivered 20+ projects across various domains',
    date: '2020 - Present',
    icon: 'experience',
  },
  {
    id: '2',
    title: 'Team Leadership',
    description: 'Led development teams and mentored junior developers',
    date: '2022 - Present',
    icon: 'leadership',
  },
  {
    id: '3',
    title: 'AI/ML Integration',
    description: 'Successfully integrated AI/ML capabilities in multiple projects',
    date: '2023',
    icon: 'ai',
  },
  {
    id: '4',
    title: 'Micro Frontend Architecture',
    description: 'Implemented scalable micro frontend solutions using Single SPA',
    date: '2023',
    icon: 'architecture',
  },
];

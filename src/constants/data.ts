import { Project, Skill, SocialLink, Experience, Education, Achievement } from '@/types';

export const PERSONAL_INFO = {
  name: 'Dilip Singh',
  title: 'Senior Full Stack Developer',
  email: 'dilipsinghf@gmail.com',
  phone: '+91 7665 135 229',
  location: 'Thane, Maharashtra',
  about: `Full Stack Developer with 4+ years of experience in designing, developing, and maintaining scalable web applications. 
  Proficient in front-end (React.js, Next.js, JavaScript, TypeScript) and back-end (Node.js, Express, REST API, FastAPI) 
  with strong expertise in database management to optimize performance. Experienced in leading multiple projects simultaneously 
  and managing a team of developers to ensure timely, high-quality delivery. Skilled at delivering reliable, user-focused 
  solutions with attention to detail, creativity, and clean code practices.`,
  resumeUrl: 'https://drive.google.com/file/d/1Mwrh97qficLDATyJX9lYoA-XJKWrtjut/view?usp=sharing',
  linkedin: 'https://www.linkedin.com/in/dilip-singh-fauzdar/',
  github: 'https://dilipsingh076.github.io',
  twitter: 'https://twitter.com/dilipsinghf',
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/dilipsingh076',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/dilip-singh-fauzdar/',
    icon: 'linkedin',
  },
  {
    name: 'Portfolio',
    url: 'https://dilipsingh076.github.io',
    icon: 'portfolio',
  },
];

export const SKILLS: Skill[] = [
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

export const PROJECTS: Project[] = [
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
  },
];

// Export projectsData for backward compatibility
export const projectsData = PROJECTS;

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

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: '4+ Years Experience',
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

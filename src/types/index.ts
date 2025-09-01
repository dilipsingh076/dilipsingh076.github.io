// Global/Common Types - Used across different folders

// UI Component Types
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface Theme {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  border: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
}

// Portfolio Content Types
export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
}

// Legacy Types (keeping for backward compatibility)
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
}

export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
  proficiency: number;
}

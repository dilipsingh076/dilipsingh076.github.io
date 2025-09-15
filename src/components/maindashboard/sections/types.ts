// Section Component Types
export interface SectionProps {
  id?: string;
  className?: string;
}

export interface HeroSectionProps extends SectionProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface AboutSectionProps extends SectionProps {
  title: string;
  description: string;
  image: string;
  skills: string[];
}

export interface ProjectsSectionProps extends SectionProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
}

export interface SkillsSectionProps extends SectionProps {
  skills: Skill[];
  title?: string;
  subtitle?: string;
}

export interface ContactSectionProps extends SectionProps {
  title?: string;
  subtitle?: string;
}

// Import types from other modules
import { Project, Skill } from '@/types';

// Skill Types for public skills pages
export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
  proficiency: number;
  createdAt: string;
  updatedAt: string;
}

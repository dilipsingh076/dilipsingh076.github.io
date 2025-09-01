// Skill Types
export interface ISkill {
  _id: string;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
  proficiency: number;
  createdAt: string;
  updatedAt: string;
}

export interface SkillFormData {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
  proficiency: number;
}

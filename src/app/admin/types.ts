// Admin Dashboard Types
export interface AdminStats {
  blogs: number;
  skills: number;
  projects: number;
  contacts: number;
}

export interface AdminSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  href: string;
}

// Filter and Sort Types
export type StatusFilter = 'all' | 'pending' | 'read' | 'replied';
export type SortBy = 'date' | 'name' | 'status' | 'messages';

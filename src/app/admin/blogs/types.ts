// Blog Types
export interface IBlog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  slug: string;
  featured: boolean;
  tags: string[];
  image?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  slug: string;
  featured: boolean;
  tags: string[];
  image: string;
  published: boolean;
}

// Blog Feature Types
export interface BlogState {
  posts: BlogPost[];
  featuredPosts: BlogPost[];
  loading: boolean;
  error: string | null;
  currentPost: BlogPost | null;
}

export interface BlogFilters {
  category?: string;
  search?: string;
  featured?: boolean;
}

export interface BlogPagination {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
}

// Import types from other modules
import { BlogPost } from '@/app/blog/types';

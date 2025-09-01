import { apiService } from './api';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  tags: string[];
}

export interface BlogFilters {
  page?: number;
  category?: string;
  search?: string;
  limit?: number;
}

export interface BlogResponse {
  posts: BlogPost[];
  totalPosts: number;
  currentPage: number;
  totalPages: number;
}

class BlogService {
  async getPosts(filters: BlogFilters = {}): Promise<BlogResponse> {
    const params = new URLSearchParams();
    
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.category) params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    if (filters.limit) params.append('limit', filters.limit.toString());

    const endpoint = `/api/blog?${params.toString()}`;
    const response = await apiService.get<BlogResponse>(endpoint);
    return response.data;
  }

  async getFeaturedPosts(): Promise<BlogPost[]> {
    const response = await apiService.get<BlogPost[]>('/api/blog/featured');
    return response.data;
  }

  async getPostBySlug(slug: string): Promise<BlogPost> {
    const response = await apiService.get<BlogPost>(`/api/blog/${slug}`);
    return response.data;
  }

  async createPost(post: Omit<BlogPost, 'id' | 'date'>): Promise<BlogPost> {
    const response = await apiService.post<BlogPost>('/api/blog', post);
    return response.data;
  }

  async updatePost(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
    const response = await apiService.put<BlogPost>(`/api/blog/${id}`, post);
    return response.data;
  }

  async deletePost(id: string): Promise<void> {
    await apiService.delete(`/api/blog/${id}`);
  }
}

export const blogService = new BlogService();



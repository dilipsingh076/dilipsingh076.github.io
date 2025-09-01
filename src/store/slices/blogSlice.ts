import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface BlogPost {
  id: string;
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

export interface BlogState {
  posts: BlogPost[];
  featuredPosts: BlogPost[];
  currentPost: BlogPost | null;
  loading: boolean;
  error: string | null;
  totalPosts: number;
  currentPage: number;
  postsPerPage: number;
  categories: string[];
  selectedCategory: string;
  searchQuery: string;
}

const initialState: BlogState = {
  posts: [],
  featuredPosts: [],
  currentPost: null,
  loading: false,
  error: null,
  totalPosts: 0,
  currentPage: 1,
  postsPerPage: 9,
  categories: [],
  selectedCategory: 'All',
  searchQuery: '',
};

// Async thunks
export const fetchBlogPosts = createAsyncThunk(
  'blog/fetchPosts',
  async (params: { page?: number; category?: string; search?: string } = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.category && params.category !== 'All') queryParams.append('category', params.category);
      if (params.search) queryParams.append('search', params.search);

      const response = await fetch(`/api/blog?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch blog posts');
    }
  }
);

export const fetchFeaturedPosts = createAsyncThunk(
  'blog/fetchFeaturedPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/blog/featured');
      if (!response.ok) {
        throw new Error('Failed to fetch featured posts');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch featured posts');
    }
  }
);

export const fetchBlogPostBySlug = createAsyncThunk(
  'blog/fetchPostBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/blog/${slug}`);
      if (!response.ok) {
        throw new Error('Blog post not found');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch blog post');
    }
  }
);

export const createBlogPost = createAsyncThunk(
  'blog/createPost',
  async (postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error('Failed to create blog post');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create blog post');
    }
  }
);

export const updateBlogPost = createAsyncThunk(
  'blog/updatePost',
  async ({ id, postData }: { id: string; postData: Partial<BlogPost> }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error('Failed to update blog post');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update blog post');
    }
  }
);

export const deleteBlogPost = createAsyncThunk(
  'blog/deletePost',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete blog post');
      }
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete blog post');
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.totalPosts = action.payload.total;
        state.categories = action.payload.categories;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch featured posts
      .addCase(fetchFeaturedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredPosts = action.payload.posts;
      })
      .addCase(fetchFeaturedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch single post
      .addCase(fetchBlogPostBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPostBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload.post;
      })
      .addCase(fetchBlogPostBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create post
      .addCase(createBlogPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload.post);
        state.totalPosts += 1;
      })
      // Update post
      .addCase(updateBlogPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.post.id);
        if (index !== -1) {
          state.posts[index] = action.payload.post;
        }
        if (state.currentPost?.id === action.payload.post.id) {
          state.currentPost = action.payload.post;
        }
      })
      // Delete post
      .addCase(deleteBlogPost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
        state.totalPosts -= 1;
        if (state.currentPost?.id === action.payload) {
          state.currentPost = null;
        }
      });
  },
});

export const {
  setSelectedCategory,
  setSearchQuery,
  setCurrentPage,
  clearError,
  clearCurrentPost,
} = blogSlice.actions;

export default blogSlice.reducer;

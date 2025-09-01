import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectState {
  projects: Project[];
  featuredProjects: Project[];
  loading: boolean;
  error: string | null;
  totalProjects: number;
  currentPage: number;
  projectsPerPage: number;
  selectedCategory: string;
}

const initialState: ProjectState = {
  projects: [],
  featuredProjects: [],
  loading: false,
  error: null,
  totalProjects: 0,
  currentPage: 1,
  projectsPerPage: 10,
  selectedCategory: 'all',
};

// Async thunks
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (params: { page?: number; category?: string } = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.category && params.category !== 'all') queryParams.append('category', params.category);

      const response = await fetch(`/api/projects?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch projects');
    }
  }
);

export const fetchFeaturedProjects = createAsyncThunk(
  'projects/fetchFeaturedProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/projects?featured=true');
      if (!response.ok) {
        throw new Error('Failed to fetch featured projects');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch featured projects');
    }
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.projects || action.payload;
        state.totalProjects = action.payload.total || action.payload.length;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Featured Projects
      .addCase(fetchFeaturedProjects.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchFeaturedProjects.fulfilled, (state, action) => {
        state.featuredProjects = action.payload.projects || action.payload;
      })
      .addCase(fetchFeaturedProjects.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedCategory, setCurrentPage, clearError } = projectSlice.actions;
export default projectSlice.reducer;

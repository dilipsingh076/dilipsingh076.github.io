import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
  proficiency: number;
  createdAt: string;
  updatedAt: string;
}

export interface SkillState {
  skills: Skill[];
  loading: boolean;
  error: string | null;
  totalSkills: number;
  selectedCategory: string;
}

const initialState: SkillState = {
  skills: [],
  loading: false,
  error: null,
  totalSkills: 0,
  selectedCategory: 'all',
};

// Async thunks
export const fetchSkills = createAsyncThunk(
  'skills/fetchSkills',
  async (params: { category?: string } = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.category && params.category !== 'all') queryParams.append('category', params.category);

      const response = await fetch(`/api/skills?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch skills');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch skills');
    }
  }
);

const skillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Skills
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload.skills || action.payload;
        state.totalSkills = action.payload.total || action.payload.length;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedCategory, clearError } = skillSlice.actions;
export default skillSlice.reducer;

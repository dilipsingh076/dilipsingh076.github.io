import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
  status: 'pending' | 'read' | 'replied';
  createdAt: string;
  updatedAt: string;
}

export interface ContactState {
  submissions: ContactSubmission[];
  currentSubmission: ContactSubmission | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  totalSubmissions: number;
  currentPage: number;
  submissionsPerPage: number;
  filterStatus: 'all' | 'pending' | 'read' | 'replied';
}

const initialState: ContactState = {
  submissions: [],
  currentSubmission: null,
  loading: false,
  error: null,
  success: null,
  totalSubmissions: 0,
  currentPage: 1,
  submissionsPerPage: 10,
  filterStatus: 'all',
};

// Async thunks
export const submitContactForm = createAsyncThunk(
  'contact/submitForm',
  async (formData: ContactForm, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit contact form');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to submit contact form');
    }
  }
);

export const fetchContactSubmissions = createAsyncThunk(
  'contact/fetchSubmissions',
  async (params: { page?: number; status?: string } = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.status && params.status !== 'all') queryParams.append('status', params.status);

      const response = await fetch(`/api/contact/submissions?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch contact submissions');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch contact submissions');
    }
  }
);

export const fetchContactSubmissionById = createAsyncThunk(
  'contact/fetchSubmissionById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/contact/submissions/${id}`);
      if (!response.ok) {
        throw new Error('Contact submission not found');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch contact submission');
    }
  }
);

export const updateContactSubmission = createAsyncThunk(
  'contact/updateSubmission',
  async ({ id, status }: { id: string; status: 'pending' | 'read' | 'replied' }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/contact/submissions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error('Failed to update contact submission');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update contact submission');
    }
  }
);

export const deleteContactSubmission = createAsyncThunk(
  'contact/deleteSubmission',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/contact/submissions/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete contact submission');
      }
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete contact submission');
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    setFilterStatus: (state, action: PayloadAction<'all' | 'pending' | 'read' | 'replied'>) => {
      state.filterStatus = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearCurrentSubmission: (state) => {
      state.currentSubmission = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit form
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message || 'Contact form submitted successfully!';
        state.submissions.unshift(action.payload.submission);
        state.totalSubmissions += 1;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch submissions
      .addCase(fetchContactSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions = action.payload.submissions;
        state.totalSubmissions = action.payload.total;
      })
      .addCase(fetchContactSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch single submission
      .addCase(fetchContactSubmissionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactSubmissionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSubmission = action.payload.submission;
      })
      .addCase(fetchContactSubmissionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update submission
      .addCase(updateContactSubmission.fulfilled, (state, action) => {
        const index = state.submissions.findIndex(sub => sub.id === action.payload.submission.id);
        if (index !== -1) {
          state.submissions[index] = action.payload.submission;
        }
        if (state.currentSubmission?.id === action.payload.submission.id) {
          state.currentSubmission = action.payload.submission;
        }
      })
      // Delete submission
      .addCase(deleteContactSubmission.fulfilled, (state, action) => {
        state.submissions = state.submissions.filter(sub => sub.id !== action.payload);
        state.totalSubmissions -= 1;
        if (state.currentSubmission?.id === action.payload) {
          state.currentSubmission = null;
        }
      });
  },
});

export const {
  clearError,
  clearSuccess,
  setFilterStatus,
  setCurrentPage,
  clearCurrentSubmission,
} = contactSlice.actions;

export default contactSlice.reducer;

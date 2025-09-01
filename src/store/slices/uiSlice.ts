import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

export interface UIState {
  loading: boolean;
  sidebarOpen: boolean;
  notifications: Notification[];
  theme: 'light' | 'dark' | 'system';
  language: string;
  searchOpen: boolean;
  modalOpen: boolean;
  modalType: string | null;
  modalData: any;
}

const initialState: UIState = {
  loading: false,
  sidebarOpen: false,
  notifications: [],
  theme: 'system',
  language: 'en',
  searchOpen: false,
  modalOpen: false,
  modalType: null,
  modalData: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const id = Date.now().toString();
      state.notifications.push({
        ...action.payload,
        id,
        duration: action.payload.duration || 5000,
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen;
    },
    setSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.searchOpen = action.payload;
    },
    openModal: (state, action: PayloadAction<{ type: string; data?: any }>) => {
      state.modalOpen = true;
      state.modalType = action.payload.type;
      state.modalData = action.payload.data || null;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalType = null;
      state.modalData = null;
    },
  },
});

export const {
  setLoading,
  toggleSidebar,
  setSidebarOpen,
  addNotification,
  removeNotification,
  clearNotifications,
  setTheme,
  setLanguage,
  toggleSearch,
  setSearchOpen,
  openModal,
  closeModal,
} = uiSlice.actions;

export default uiSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './slices/blogSlice';
import contactReducer from './slices/contactSlice';
import projectReducer from './slices/projectSlice';
import skillReducer from './slices/skillSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    contact: contactReducer,
    projects: projectReducer,
    skills: skillReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

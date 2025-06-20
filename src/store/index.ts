import { configureStore } from '@reduxjs/toolkit';

import notificationsReducer from './notificationsSlice';
import { supabaseApi } from './supabaseApi';
import themeReducer from './themeSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    theme: themeReducer,
    user: userReducer,
    [supabaseApi.reducerPath]: supabaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(supabaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

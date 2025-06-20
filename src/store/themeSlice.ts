import { ThemeMode } from '~/shared/ui/theme/ThemeToggle/theme.t';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Theme {
  theme: ThemeMode;
}

const initialState: Theme = {
  theme: ThemeMode.LIGHT,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;

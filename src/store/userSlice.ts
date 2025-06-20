import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string | null;
  name: string | null;
}

const initialState: UserState = {
  id: null,
  name: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ id: string; name: string }>) {
      const { id, name } = action.payload;
      state.id = id;
      state.name = name;
    },
    logoutUser(state) {
      state.id = null;
      state.name = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

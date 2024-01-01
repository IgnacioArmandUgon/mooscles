import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  email: string;
  password: string;
}

const initialState: AuthState = {
  email: '',
  password: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state = action.payload;
    },
    deleteUser: (state) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions;

export default authSlice.reducer;

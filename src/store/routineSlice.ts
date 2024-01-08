import { createSlice } from '@reduxjs/toolkit';
import { routineExer } from '../pages/Routines';

export interface AuthState {
  routine: routineExer[];
}

const initialState: AuthState = {
  routine: [],
};

export const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {
    addExercise: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.routine = [...state.routine, action.payload];
    },
    setRoutine: (state, action) => {
      state.routine = action.payload;
    },
    removeExeById: (state, action) => {
      state.routine = state.routine.filter((exe) => exe.id !== action.payload);
    },
    deleteRoutine: (state) => {
      state.routine = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addExercise, setRoutine, deleteRoutine, removeExeById } = routineSlice.actions;

export default routineSlice.reducer;

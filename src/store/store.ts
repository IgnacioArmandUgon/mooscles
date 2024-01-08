import { configureStore } from '@reduxjs/toolkit';
import routineSlice from './routineSlice';

export const store = configureStore({
  reducer: {
    routineStore: routineSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

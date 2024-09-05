import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/posts/postSlice";

export const store = configureStore({
  reducer: { posts: postReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

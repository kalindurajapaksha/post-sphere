import { fetchPostById, fetchPosts } from "@/api/posts";
import { Post, PostsState, ResponseStatus } from "@/types/common";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  searchText: "",
  status: ResponseStatus.IDLE,
};

export const getPostsBySearchText = createAsyncThunk(
  "posts/fetchPostsBySearchText",
  async (searchText: string, thunkAPI) => {
    const response = await fetchPosts(searchText);
    return response;
  }
);
export const getPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id: string, thunkAPI) => {
    const response = await fetchPostById(id);
    return response;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsBySearchText.pending, (state) => {
        state.status = ResponseStatus.LOADING;
      })
      .addCase(getPostsBySearchText.fulfilled, (state, action) => {
        state.status = ResponseStatus.SUCCESS;
        state.posts = action.payload;
      })
      .addCase(getPostsBySearchText.rejected, (state) => {
        state.status = ResponseStatus.FAILED;
      })
      .addCase(getPostById.pending, (state) => {
        state.status = ResponseStatus.LOADING;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.status = ResponseStatus.SUCCESS;
        state.selectedPost = action.payload;
      })
      .addCase(getPostById.rejected, (state) => {
        state.status = ResponseStatus.FAILED;
      });
  },
});

export const { setSearchText: setSearchTextAction, setPosts: setPostsAction } =
  postsSlice.actions;
export default postsSlice.reducer;

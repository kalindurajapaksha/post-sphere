import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@/lib/store"; // Adjust import based on your store setup
import Home from "../components/Home";
import { ResponseStatus } from "@/types/common";
import { AppDispatch } from "@/lib/store";
import {
  setPostsAction,
  getPostsBySearchText,
} from "@/lib/features/posts/postSlice";
import { Post } from "@/types/common";
import postReducer from "../lib/features/posts/postSlice";
import "@testing-library/jest-dom";
import React from "react";
import { useDispatch } from "react-redux";

const mockStore = (initialState) => {
  return configureStore({
    reducer: { posts: postReducer },
    preloadedState: initialState,
  });
};

const mockPosts = [
  { id: 1, name: "Post 1", cuisine: "Cuisine 1" },
  { id: "2", name: "Post 2", cuisine: "Cuisine 2" },
];

describe("Home Component", () => {
  it("renders with initial posts", () => {
    const store = mockStore({
      posts: {
        posts: mockPosts,
        searchText: "",
        status: ResponseStatus.SUCCESS,
        selectedPost: null,
      },
    });

    render(
      <Provider store={store}>
        <Home initialPosts={mockPosts} />
      </Provider>
    );

    mockPosts.forEach((post) => {
      expect(screen.getByText(post.name)).toBeInTheDocument();
    });
  });

  it("displays skeleton loader when status is LOADING", () => {
    const store = mockStore({
      posts: {
        posts: [],
        searchText: "",
        status: ResponseStatus.LOADING,
        selectedPost: null,
      },
    });

    render(
      <Provider store={store}>
        <Home initialPosts={mockPosts} />
      </Provider>
    );

    expect(screen.getAllByTestId("skeleton-loader")).toHaveLength(30);
  });
});

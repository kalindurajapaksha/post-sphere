import { ResponseStatus } from "@/types/common";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import Home from "../components/Home";
import postReducer from "../lib/features/posts/postSlice";

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

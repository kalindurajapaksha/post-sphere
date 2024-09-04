// app/Home.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../app/page";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  setSearchText,
  getPostsBySearchText,
} from "../lib/features/posts/postSlice";
import "@testing-library/jest-dom";
// import userEvent from "@testing-library/user-event";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Home Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      posts: {
        posts: [],
        searchText: "",
        status: "idle",
        selectedPost: null,
      },
    });

    // Mock dispatch implementation
    store.dispatch = jest.fn();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

  it("should dispatch getPostsBySearchText on mount with empty searchText", () => {
    renderComponent();

    expect(store.dispatch).toHaveBeenCalledWith(getPostsBySearchText(""));
  });

  it("should display loading message when status is LOADING", () => {
    store = mockStore({
      posts: {
        posts: [],
        searchText: "",
        status: "LOADING",
        selectedPost: null,
      },
    });

    renderComponent();

    expect(screen.getByText(/Loading posts.../i)).toBeInTheDocument();
  });

  //   it("should display error message when status is FAILURE", () => {
  //     store = mockStore({
  //       posts: {
  //         posts: [],
  //         searchText: "",
  //         status: "FAILURE",
  //         error: "Failed to fetch posts",
  //       },
  //     });

  //     render(
  //       <Provider store={store}>
  //         <Home />
  //       </Provider>
  //     );

  //     expect(
  //       screen.getByText(/Error: Failed to fetch posts/i)
  //     ).toBeInTheDocument();
  //   });

  //   it("should display posts when status is SUCCESS", () => {
  //     const posts = [
  //       { id: 1, title: "Post 1", body: "Content 1" },
  //       { id: 2, title: "Post 2", body: "Content 2" },
  //     ];

  //     store = mockStore({
  //       posts: {
  //         posts,
  //         searchText: "",
  //         status: "SUCCESS",
  //         error: null,
  //       },
  //     });

  //     render(
  //       <Provider store={store}>
  //         <Home />
  //       </Provider>
  //     );

  //     expect(screen.getByText("Post 1")).toBeInTheDocument();
  //     expect(screen.getByText("Post 2")).toBeInTheDocument();
  //   });

  //   it('should display "No posts found" when status is SUCCESS but no posts', () => {
  //     store = mockStore({
  //       posts: {
  //         posts: [],
  //         searchText: "",
  //         status: "SUCCESS",
  //         error: null,
  //       },
  //     });

  //     render(
  //       <Provider store={store}>
  //         <Home />
  //       </Provider>
  //     );

  //     expect(screen.getByText(/No posts found/i)).toBeInTheDocument();
  //   });

  //   it("should dispatch getPostsBySearchText when searchText changes", () => {
  //     renderComponent();

  //     const input = screen.getByPlaceholderText(/Search posts.../i);
  //     userEvent.type(input, "react");

  //     // Expect setSearchText to be dispatched for each character
  //     expect(store.dispatch).toHaveBeenCalledWith(setSearchText("r"));
  //     expect(store.dispatch).toHaveBeenCalledWith(setSearchText("re"));
  //     expect(store.dispatch).toHaveBeenCalledWith(setSearchText("rea"));
  //     expect(store.dispatch).toHaveBeenCalledWith(setSearchText("reac"));
  //     expect(store.dispatch).toHaveBeenCalledWith(setSearchText("react"));

  //     // Expect getPostsBySearchText to be dispatched with 'react'
  //     expect(store.dispatch).toHaveBeenCalledWith(getPostsBySearchText("react"));
  //   });
});

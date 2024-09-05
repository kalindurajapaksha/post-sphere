"use client";

import {
  getPostsBySearchText,
  setPostsAction,
} from "@/lib/features/posts/postSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { Post, ResponseStatus } from "@/types/common";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomePageSkeleton from "./HomePageSkeleton";
import PostItem from "./PostItem";

interface HomePageProps {
  initialPosts: Post[];
}

const Home = ({ initialPosts }: HomePageProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, searchText, status } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    if (searchText === "") {
      dispatch(setPostsAction(initialPosts));
    } else {
      dispatch(getPostsBySearchText(searchText));
    }
  }, [searchText]);

  if (status === ResponseStatus.LOADING) {
    return (
      <div className="container grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array(30)
          .fill(0)
          .map(() => (
            <HomePageSkeleton />
          ))}
      </div>
    );
  }

  return (
    <div className="container grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};
export default Home;

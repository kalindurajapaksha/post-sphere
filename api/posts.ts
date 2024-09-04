import { Post } from "../types/common";
import { get } from "./apiClient";

export const fetchPosts = async (query: string): Promise<Post[]> => {
  const url = "/recipes" + (query !== "" ? `/search/?q=${query}` : "");
  return (await get<{ recipes: Post[] }>(url)).recipes;
};

export const fetchPostById = async (id: string): Promise<Post> => {
  return get<Post>(`/recipes/${id}`);
};

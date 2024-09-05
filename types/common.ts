export type Post = {
  id: number;
  name: string;
  cuisine: string;
  difficulty: string;
  rating: number;
  image: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  caloriesPerServing: number;
  ingredients: string[];
  instructions: string[];
};

export type PostState = {
  posts: Post[];
  searchText: string;
};

export enum ResponseStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  FAILED = "failed",
}

export type PostsState = {
  posts: Post[];
  searchText: string;
  status: ResponseStatus;
  selectedPost: Post | null;
};

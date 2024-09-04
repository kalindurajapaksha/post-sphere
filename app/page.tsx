import { fetchPosts } from "@/api/posts";
import Home from "@/components/Home";
import { Post } from "@/types/common";

export default async function HomePage() {
  const initialPosts: Post[] = await fetchPosts("");
  return <Home initialPosts={initialPosts} />;
}

import { fetchPosts } from "@/api/posts";
import Home from "@/components/Home";

export default async function HomePage() {
  const posts = await fetchPosts("");
  return <Home initialPosts={posts} />;
}

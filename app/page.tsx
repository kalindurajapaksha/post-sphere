import { fetchPosts } from "@/api/posts";
import { Post } from "@/types/common";
import dynamic from "next/dynamic";

const PostContent = dynamic(() => import("@/components/Home"), { ssr: false });

export default async function HomePage() {
  const initialPosts: Post[] = await fetchPosts("");
  return <PostContent initialPosts={initialPosts} />;
}

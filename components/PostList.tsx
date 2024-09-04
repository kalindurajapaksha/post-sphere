import { Post } from "@/types/common";
import PostItem from "./PostItem";

type PostListProps = {
  posts: Post[];
};
const PostList = ({ posts }: PostListProps) => {
  return (
    <ul>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default PostList;

import { Post } from "@/types/common";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { useTranslations } from "next-intl";

type PostItemProps = {
  post: Post;
};
const PostItem = ({ post }: PostItemProps) => {
  const t = useTranslations("PostDetails");
  return (
    <Link
      href={{ pathname: `/posts/${post.id}`, query: { name: post.name } }}
      passHref
      legacyBehavior
    >
      <Card>
        <div className="relative w-full h-[200px]">
          <Badge className="absolute bottom-1 right-1 z-10">
            {t("cuisine")}: {post.cuisine}
          </Badge>
          <Image
            src={post.image}
            alt={post.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-md"
            quality={1}
          />
        </div>
        <CardContent>
          <CardHeader className="p-0 pb-2">
            <h2 className="text-md truncate">{post.name}</h2>
          </CardHeader>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostItem;

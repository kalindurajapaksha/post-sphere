"use client";

import SkeletonCard from "@/components/SkeletonCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPostById } from "@/lib/features/posts/postSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { ResponseStatus } from "@/types/common";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PostDetails = ({ params }: { params: { id: string } }) => {
  const t = useTranslations("PostDetails");
  const postName = useSearchParams().get("name");
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPost: post, status } = useSelector(
    (state: RootState) => state.posts
  );
  useEffect(() => {
    dispatch(getPostById(params.id as string));
  }, [dispatch]);

  if (status === ResponseStatus.FAILED) throw new Error("Something went wrong");

  if (status === ResponseStatus.LOADING || !post) {
    return (
      <div className="w-full flex flex-col justify-between">
        <h1 className="-mb-3 text-xl font-light">{postName}</h1>
        <SkeletonCard />
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex justify-between">
        <h1 className="pb-6 text-xl font-light">{post.name}</h1>
        <div>
          <Badge>
            {t("cuisine")}: {post.cuisine}
          </Badge>
          <Badge>
            {t("calories")}: {post.caloriesPerServing}
          </Badge>
          <Badge>
            {t("difficulty")}: {post.difficulty}
          </Badge>
        </div>
      </div>
      <Card className="w-[100%] mt-2 flex">
        <div className="relative flex-1 h-[500px]">
          <Image
            src={post.image}
            alt={post.name}
            layout="fill"
            objectFit="cover"
            className="rounded-l-md"
          />
        </div>
        <CardContent className="flex-1">
          <Tabs defaultValue="ingredients">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ingredients">{t("ingredients")}</TabsTrigger>
              <TabsTrigger value="instructions">
                {t("instructions")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="ingredients">
              <Card>
                <CardContent className="space-y-2">
                  <ul>
                    {post.ingredients.map((ing, index) => (
                      <li key={index} className="pb-1">
                        <p className="text-sm font-light">{ing}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="instructions">
              <Card>
                <CardContent className="space-y-2">
                  <ul>
                    {post.instructions.map((ins, index) => (
                      <li key={index} className="pb-1">
                        <p className="text-sm font-light">{ins}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};
export default PostDetails;

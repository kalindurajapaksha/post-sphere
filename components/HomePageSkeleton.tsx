import React from "react";
import { Skeleton } from "./ui/skeleton";

const HomePageSkeleton = () => {
  return (
    <div
      data-testid="skeleton-loader"
      className="flex flex-col space-y-3 w-full gap-5"
    >
      <Skeleton className="h-[200px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default HomePageSkeleton;

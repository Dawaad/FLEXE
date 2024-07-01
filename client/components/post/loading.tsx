import { Skeleton } from "../ui/skeleton";

export const LoadingPost = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center px-16">
      <Skeleton className="w-full h-16" />
      <Skeleton className="w-full h-32" />
      <Skeleton className="w-full h-32" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-32" />
    </div>
  );
};

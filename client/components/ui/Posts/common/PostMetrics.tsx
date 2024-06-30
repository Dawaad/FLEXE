"use client";

import { PostExternalData } from "@/lib/interface";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  externalData: PostExternalData;
}

const PostMetrics = ({ externalData }: Props) => {
  const router = useRouter();
  console.log(externalData);
  return (
    <div className="border-t-2 flex justify-between items-center">
      <Button
        className="flex items-center rounded-none w-full"
        onClick={() => {}}
        variant={"ghost"}
      >
        <HandThumbUpIcon className="w-4 h-4" />
        <span className="ml-1">{externalData.likeCount}</span>
      </Button>
      <Button
        onClick={() => {
          router.refresh();
        }}
        variant={"ghost"}
        className="flex items-center rounded-none w-full"
      >
        <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />
        <span className="ml-1">{externalData.commentCount}</span>
      </Button>
      <Button
        variant={"ghost"}
        className="flex items-center rounded-none w-full"
      >
        <BookmarkIcon className="w-4 h-4" />
        <span className="ml-1">{externalData.saveCount}</span>
      </Button>
    </div>
  );
};

export default PostMetrics;

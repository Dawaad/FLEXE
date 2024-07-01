"use client";

import { PostToolsProvider } from "@/components/context/PostOptionToolProvider";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardFooter } from "@/components/ui/card";
import { UserTextPost } from "@/lib/interface";
import {
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { User } from "next-auth";
import { timeAgo } from "../../../../lib/dateutils";
import { Button } from "../../button";

interface TextPostPreviewProps {
  user: User;
  post: UserTextPost;
}

const TextPostPreview = (props: TextPostPreviewProps) => {
  const { post, user } = props;
  if (!post.id || !user) return null;

  return (
    <Card className=" w-full my-4">
      <main className="p-4">
        <section className="flex space-x-1 items-center p-2 justify-between">
          <div className="flex">
            <Avatar className="w-7 h-7 mr-2">
              <AvatarImage
                className="object-cover"
                src={user.image ?? process.env.NEXT_PUBLIC_FALLBACK_PHOTO}
              />
            </Avatar>
            <div className="flex items-center space-x-2">
              <div>{user.username}</div>
            </div>
            <div className="flex items-center ml-2 space-x-2">
              <div className="text-secondary-header">
                {timeAgo(post.createdAt)}
              </div>
            </div>
          </div>

          <PostToolsProvider postId={post.id} postType="TEXT">
            <Button size={"icon"} variant={"ghost"}>
              <EllipsisHorizontalIcon className="w-6 h-6" />
            </Button>
          </PostToolsProvider>
        </section>

        <section className="ml-12">{post.textpost}</section>
        <CardFooter className="py-3 ml-6 justify-left space-x-4">
          <div className="flex space-x-2 items-center">
            <span>{post.externalData.likeCount}</span>
            <HandThumbUpIcon className="w-4 h-4" />
          </div>
          <div className="flex space-x-2 items-center">
            <span>{post.externalData.commentCount}</span>
            <ChatBubbleOvalLeftIcon className="w-4 h-4" />
          </div>
        </CardFooter>
      </main>
    </Card>
  );
};

export default TextPostPreview;

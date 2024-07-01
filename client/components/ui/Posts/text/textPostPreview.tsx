"use client";

import { UserTextPost } from "@/lib/interface";
import {
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { User } from "next-auth";
import { timeAgo } from "../../../../lib/dateutils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardFooter } from "@/components/ui/card";

interface TextPostPreviewProps {
  user: User;
  textpost: UserTextPost;
}

const TextPostPreview = (props: TextPostPreviewProps) => {
  return (
    <Card className=" w-full my-4">
      <main className="p-4">
        <section className="flex space-x-1 items-center p-2 justify-between">
          <div className="flex">
            <Avatar className="w-7 h-7 mr-2">
              <AvatarImage
                className="object-cover"
                src={props.user.image ?? process.env.NEXT_PUBLIC_FALLBACK_PHOTO}
              />
            </Avatar>
            <div className="flex items-center space-x-2">
              <div>{props.user.username}</div>
            </div>
            <div className="flex items-center ml-2 space-x-2">
              <div className="text-secondary-header">
                {timeAgo(props.textpost.createdAt)}
              </div>
            </div>
          </div>
          <EllipsisHorizontalIcon className="w-4 h-4" />
        </section>

        <section className="ml-12">{props.textpost.textpost}</section>
        <CardFooter className="py-3 ml-6 justify-left space-x-4">
          <div className="flex space-x-2 items-center">
            <span>{props.textpost.externalData.likeCount}</span>
            <HandThumbUpIcon className="w-4 h-4" />
          </div>
          <div className="flex space-x-2 items-center">
            <span>{props.textpost.externalData.commentCount}</span>
            <ChatBubbleOvalLeftIcon className="w-4 h-4" />
          </div>
        </CardFooter>
      </main>
    </Card>
  );
};

export default TextPostPreview;

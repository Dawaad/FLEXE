"use client";

import { UserPost } from "@/lib/interface";
import ErrorPage from "../Error";
import CommentPanel from "../ui/Posts/media/Comment/CommentPanel";
import DisplayPost from "../ui/Posts/media/DisplayPost";

interface Props {
  post: UserPost;
}

const PostDisplayWrapper = ({ post }: Props) => {
  if (!post.id) return <ErrorPage />;

  return (
    <>
      <CommentPanel postId={post.id} />
      <div className="w-full h-full flex-col">
        <DisplayPost post={post} />
      </div>
    </>
  );
};

export default PostDisplayWrapper;

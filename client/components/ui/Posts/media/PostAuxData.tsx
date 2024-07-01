"use client";

import { UserPost } from "@/lib/interface";
import CommentInput from "./Comment/CommentInput";
import ModalComments from "./Comment/ModalComment";
import PostMetrics from "./PostMetrics";

interface Props {
  selectedPost: UserPost;
}

const PostAuxData = (props: Props) => {
  const { selectedPost } = props;
  return (
    <div className="w-full md:min-w-[14rem] md:max-w-[14rem] lg:min-w-[20rem] lg:max-w-[20rem] md:relative md:h-full md:border-r-2 flex flex-col">
      <div className="hidden md:block h-full overflow-y-auto" id="comments">
        <ModalComments />
      </div>
      <PostMetrics post={selectedPost} />
      <CommentInput />
    </div>
  );
};

export default PostAuxData;

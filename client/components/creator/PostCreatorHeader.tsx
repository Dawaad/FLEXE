"use client";

import { savePost } from "@/controllers/PostController";
import { PostStatus, UserPost } from "@/lib/interface";
import { cn } from "@/lib/utils";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import CancelWarn from "../CancelWarn";
import { useAccount } from "../context/AccountProvider";
import { useDocumentCreator } from "../context/DocumentCreatorProvider";
import { usePostAuxData } from "../context/PostCreatorAuxProvider";
import { Button } from "../ui/button";
import PostSubmit from "./PostSubmit";

export const CreatorHeader = () => {
  const { document, setDocument } = useDocumentCreator();
  const { setMediaPosts } = useAccount();
  const { user } = useAccount();
  const router = useRouter();
  const { scrollY } = useScroll();
  const { thumbnail, id, title, tags, tech, postStatus, setAuxData } =
    usePostAuxData();

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const THRESHOLD = 400;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollPosition(latest);
  });

  const publishPost = async () => {
    const response = await handlePostSave("PUBLISHED");
    if (!response) return;

    setShowPublishModal(false);
    router.push(`/${user?.username}/posts`);
  };

  const handlePostSave = async (type: PostStatus): Promise<boolean> => {
    if (!user) return false;
    return new Promise<boolean>((resolve, reject) => {
      const post: Omit<UserPost, "externalData"> = {
        id,
        document,
        auxData: {
          userID: user.id,
          title,
          tags,
          tech,
          dateCreated: new Date(),
          thumbnail,
          postStatus: type,
        },
      };

      toast.promise(savePost(post), {
        loading: `Saving Post...`,
        success: (data) => {
          if (!data) return;

          setDocument(data.document);
          setAuxData(data);
          setMediaPosts((prev) => [...prev, data]);
          resolve(true);
          return `Saved Post Successfully`;
        },
        error: () => {
          reject(false);
          return `Failed to Save Post`;
        },
      });
    });
  };

  const onCancel = () => {
    setShowCancelModal(true);
  };
  return (
    <>
      <section
        className={cn(
          "h-[4rem] w-full py-4 sticky z-[40] top-[5rem] origin-top flex opacity-100 transition-all",
          scrollPosition > THRESHOLD && "opacity-0 -top-[1rem]"
        )}
      >
        <div className="hidden md:block w-24 px-6">
          <Button onClick={onCancel} variant={"destructive"}>
            Cancel
          </Button>
        </div>
        <div className="flex flex-grow justify-end mr-16 space-x-4">
          <Button
            onClick={onCancel}
            className="block md:hidden"
            variant={"destructive"}
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              handlePostSave("DRAFT");
            }}
            className="backdrop-blur-md z-[99]"
            variant={"outline"}
          >
            Save as Draft
          </Button>
          <Button onClick={() => setShowPublishModal(true)}>Publish</Button>
        </div>
      </section>
      <PostSubmit
        onSubmit={publishPost}
        open={showPublishModal}
        callback={setShowPublishModal}
      />
      <CancelWarn
        path="/"
        open={showCancelModal}
        callback={setShowCancelModal}
      />
    </>
  );
};

import { useAccount } from "@/components/context/AccountProvider";
import { ToolModalProp } from "@/components/context/PostOptionToolProvider";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { DeletePost } from "@/controllers/PostController";
import { DialogDescription } from "@radix-ui/react-dialog";
import { toast } from "sonner";

const DeletePostModal = (props: ToolModalProp) => {
  const { callback, postId, postType } = props;
  const { setTextPosts, setMediaPosts } = useAccount();

  const onDelete = async () => {
    toast.promise(DeletePost(postId, postType), {
      loading: "Deleting post...",
      success: () => {
        postType === "MEDIA"
          ? setMediaPosts((prev) => prev.filter((post) => post.id !== postId))
          : setTextPosts((prev) => prev.filter((post) => post.id !== postId));
          
        callback();
        return "Post Deleted successfully!";
      },
      error: () => {
        callback();
        return "Failed to delete post";
      },
    });
  };

  return (
    <DialogPortal>
      <DialogOverlay className="bg-black/30" />
      <DialogContent>
        <DialogHeader>Delete This Post?</DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </DialogDescription>
        <DialogFooter>
          <Button variant={"outline"} onClick={callback}>
            Cancel
          </Button>
          <Button variant={"destructive"} onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  );
};

export default DeletePostModal;

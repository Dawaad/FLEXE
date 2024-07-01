import { useProfileViewer } from "@/components/context/UserProfileProvider";
import TextPostPreview from "@/components/ui/Posts/text/textPostPreview";

export const Activity = () => {
  const { fetchedAccount } = useProfileViewer();

  if (!fetchedAccount) return null;
  const { user, textPosts } = fetchedAccount;

  return (
    <div className="w-full mt-4">
      {textPosts
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((post, index) => (
          <TextPostPreview user={user} post={post} key={index} />
        ))}
    </div>
  );
};

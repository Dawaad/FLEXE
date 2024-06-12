import { Document, PostUserMedia, UserPost } from "@/lib/interface";
import { supabase } from "@/lib/supabase";
import {
  convertImageSourceToFile,
  generateMongoID,
  getVideoThumbnail,
  nullIfEmpty,
} from "@/lib/utils";

/*
  Post Uploading/Manipulation
*/

export const savePost = async (
  post: Omit<UserPost, "externalData">
): Promise<UserPost | undefined> => {
  const postID = post.id ?? (await generateMongoID());
  if (!postID) return;

  const uploadedDocument = await generateNewContentFromUpload(
    post.document,
    postID,
    post.auxData.userID
  );
  const thumbnail =
    nullIfEmpty(post.auxData.thumbnail) ??
    (await handlePostThumbnail(uploadedDocument, postID, post.auxData.userID));

  const postToUpload: UserPost = {
    id: postID,
    auxData: {
      ...post.auxData,
      thumbnail: thumbnail,
    },
    document: uploadedDocument,
    externalData: {
      likeCount: 0,
      commentCount: 0,
      viewCount: 0,
    },
  };
  // Send Data to Proxy Server
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CORE_BACKEND_API_URL}post/media/upload`,
      {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postToUpload),
      }
    );
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const archiveDocument = async (postID: string) => {};

/*
  Post Retrieval
*/

export const GetAllUserPosts = async (
  userID: string
): Promise<UserPost[] | undefined> => {
  try {
    const response = fetch(
      `${process.env.NEXT_PUBLIC_CORE_BACKEND_API_URL}post/media/user/${userID}`
    );
    return (await response).json();
  } catch (e) {
    console.error(e);
    return;
  }
};

/* 
Helper Functions
*/

const generateNewContentFromUpload = async (
  document: Document,
  postID: string,
  userID: string
): Promise<Document> => {
  return await Promise.all(
    document.map(async (block) => {
      if (block.value?.contentValue instanceof Array) {
        const uploadedMedia = await Promise.all(
          block.value.contentValue.map(async (media: PostUserMedia) => {
            return await uploadContentToSupabase(userID, media, postID);
          })
        );
        return {
          ...block,
          value: {
            contentValue: uploadedMedia,
          },
        };
      } else if (typeof block.value?.contentValue !== "string") {
        const uploadedMedia = await uploadContentToSupabase(
          userID,
          block.value?.contentValue as PostUserMedia,
          postID
        );
        return {
          ...block,
          value: {
            contentValue: uploadedMedia,
          },
        };
      }
      return block;
    })
  );
};

const uploadContentToSupabase = async (
  userID: string,
  media: PostUserMedia,
  folder: string
): Promise<PostUserMedia> => {
  if (media.content.uploaded) return media;
  const { error } = await supabase.storage
    .from("post-content")
    .upload(`/${userID}/${folder}/${media.content.id}`, media.file!, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) {
    console.error(error);
    return media;
  }

  return {
    ...media,
    content: {
      ...media.content,
      location: `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_RETRIEVAL_URL}post-content/${userID}/${folder}/${media.content.id}`,
      uploaded: true,
    },
  };
};

const handlePostThumbnail = async (
  document: Document,
  postID: string,
  userID: string
): Promise<string> => {
  const thumbnail = await generateThumbnailSource(document);
  const uploadedFile = await convertImageSourceToFile(
    thumbnail,
    "thumbnail.jpg"
  );
  if (!uploadedFile) return process.env.NEXT_PUBLIC_FALLBACK_PHOTO; //Fallback Photo
  return await uploadThumbnailToSupabase(uploadedFile, postID, userID);
};

const generateThumbnailSource = async (document: Document): Promise<string> => {
  //This will find the first instance of visual content and generate a sized down thumbnail for the post
  const visualTypes = ["IMAGE", "VIDEO", "CAROUSEL"];
  const content = document.find(
    (block) => block.type && visualTypes.includes(block.type)
  );
  if (!content || !content.value?.contentValue)
    return process.env.NEXT_PUBLIC_FALLBACK_PHOTO;

  const media = content.value.contentValue;
  if (media instanceof Array) {
    return media[0].content.location ?? process.env.NEXT_PUBLIC_FALLBACK_PHOTO;
  } else {
    const location = (media as PostUserMedia).content.location;
    if (content.type === "VIDEO") {
      return (
        (await getVideoThumbnail(location)) ??
        process.env.NEXT_PUBLIC_FALLBACK_PHOTO
      );
    } else {
      return location ?? process.env.NEXT_PUBLIC_FALLBACK_PHOTO;
    }
  }
};

const uploadThumbnailToSupabase = async (
  thumbnail: File,
  postID: string,
  userID: string
): Promise<string> => {
  const { error } = await supabase.storage
    .from("post-content")
    .upload(`/${userID}/${postID}/thumbnail.jpg`, thumbnail, {
      cacheControl: "3600",
      upsert: true,
    });
  if (error) {
    console.error(error);
    return process.env.NEXT_PUBLIC_FALLBACK_PHOTO; //Fallback Photo
  }
  return `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_RETRIEVAL_URL}post-content/${userID}/${postID}/thumbnail.jpg`;
};

export const publishPost = async (post: UserPost) => {
  if (!post.id) {
    //Create new Database Object
  } else {
    //Update existing Database Object
  }
};

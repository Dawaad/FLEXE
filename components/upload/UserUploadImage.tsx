"use client";

import { toast } from "sonner";
import { FileUploader } from "../FileUploader";
import { PostContent, PostContentType } from "@prisma/client";
import { CreatePost, PostCreationContent } from "@/lib/interface";
interface Props {
  setUploadedFiles: React.Dispatch<React.SetStateAction<CreatePost[]>>;
}

const mbRatio = 1000000;

const UploadUserImages = ({ setUploadedFiles }: Props) => {
  const handleFileUpload = (files: File[]) => {
    files.forEach((file) => {
      if (file.type.includes("image")) {
        handleImageValidation(file).then((content) => {
          content && setUploadedFiles((prev) => [...prev, content]);
        });
        return;
      }

      if (file.type.includes("video")) {
        handleVideoValidation(file).then((content) => {
          content && setUploadedFiles((prev) => [...prev, content]);
        });
        return;
      }

      toast.message(file.name, {
        description:
          "This image has not been included as it is not an Image or Video file",
      });
    });
  };

  const handleImageValidation = (
    file: File
  ): Promise<CreatePost | undefined> => {
    return new Promise((resolve) => {
      // Size Validation
      if (file.size > 10 * mbRatio) {
        toast.message(file.name, {
          description: "This image is too large to be uploaded",
        });
        resolve(undefined);
      }

      // Resolution Validation
      const img = new Image();
      img.onload = () => {
        if (img.width < 1000 || img.height < 660) {
          toast.message(file.name, {
            description: "This image is too small to be uploaded",
          });
          resolve(undefined);
        } else {
          const content: PostCreationContent = {
            userPostId: null,
            location: img.src,
            width: img.width,
            height: img.height,
            format: file.type.includes("gif")
              ? PostContentType.GIF
              : PostContentType.IMAGE,
          };
          resolve({
            content,
            file,
          });
        }
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleVideoValidation = (
    file: File
  ): Promise<CreatePost | undefined> => {
    return new Promise((resolve) => {
      // Size Validation
      if (file.size > 15 * mbRatio) {
        toast.message(file.name, {
          description: "This video is too large to be uploaded",
        });
        resolve(undefined);
      }

      // Resolution Validation
      const video = document.createElement("video");
      video.onloadedmetadata = () => {
        if (video.videoWidth < 1000 || video.videoHeight < 660) {
          toast.message(file.name, {
            description: "This video is too small to be uploaded",
          });
          resolve(undefined);
        } else {
          const content: PostCreationContent = {
            userPostId: null,
            location: video.src,
            width: video.videoWidth,
            height: video.videoHeight,
            format: PostContentType.VIDEO,
          };
          resolve({
            content,
            file,
          });
        }
      };

      video.src = URL.createObjectURL(file);
    });
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-2xl lg:text-4xl text-center font-bold">
        Lets get started with your new post
      </h1>
      <h2 className="text-secondary-header text-lg lg:text-xl lg:max-w-screen-lg text-center mt-4 font-semibold">
        <div>
          Drag and drop photos to help showcase your work to the fullest extent
        </div>
        <div className="mt-4 text-base">
          {"("}more can be uploaded at any given time{")"}
        </div>
      </h2>
      <FileUploader
        className="max-w-screen-xl mt-8 h-96"
        onFileUpload={handleFileUpload}
        fileSizeLimit={1000000}
      >
        Hey
      </FileUploader>
    </div>
  );
};

export default UploadUserImages;

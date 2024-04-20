"use client";

import React from "react";
import { useAccount } from "../../context/AccountProvider";
import { FileUploader } from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { UploadProfileReadMe } from "@/controllers/ProfileController";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import MarkdownEditor from "./mdEditor";
import { useTheme } from "next-themes";
import { userProfileViewer } from "@/components/context/UserProfileProvider";

const ReadMe = () => {
  const { fetchedProfile, fetchedUser, setFetchedProfile, isUserProfile } =
    userProfileViewer();
  const readMe = fetchedProfile?.readMe;
  const { theme } = useTheme();
  if (!fetchedUser || !fetchedProfile) return null;
  const uploadReadMe = async (file: File) => {
    //Ensure File Upload is of type .html
    if (file.type !== "text/html") {
      toast.error("Invalid File Type. Please upload a markdown file.", {
        position: "top-right",
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = Buffer.from(reader.result as ArrayBuffer);
      if (!content) return;

      //Upload Buffer to Database
      const response = await UploadProfileReadMe(content, fetchedUser.id);
      if (response) {
        toast.success("ReadMe File Uploaded Successfully", {
          position: "top-right",
        });
        //Update Locally
        setFetchedProfile({ ...fetchedProfile, readMe: content });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const newReadme = () => {
    //Create a new ReadMe File
    const content = Buffer.from("This is a brand new HTML Document");
    UploadProfileReadMe(content, fetchedUser.id).then((response) => {
      if (response) {
        toast.success("ReadMe File Created Successfully", {
          position: "top-right",
        });
        //Update Locally
        setFetchedProfile({ ...fetchedProfile, readMe: content });
      }
    });
  };

  if (!readMe) {
    if (isUserProfile) {
      return (
        <section className="flex flex-col items-center py-12 px-8">
          <h2 className="text-2xl font-bold">
            No ReadMe File Found for this Account
          </h2>
          <h3 className="text-secondary-header mt-2 max-w-md">
            Drag an existing html file in or click the Plus button to create a
            brand new one!
          </h3>
          <div className="w-full h-full relative">
            <FileUploader
              className="my-8 h-[30rem]"
              onFileUpload={uploadReadMe}
            />

            <Button
              onClick={newReadme}
              className="absolute -right-6 top-2 rounded-full h-14 w-14 px-0 hover:bg-transparent"
              variant={"ghost"}
            >
              <PlusCircleIcon className="w-14 h-14 stroke-secondary-header rounded-full backdrop-blur-lg hover:stroke-primary transition-colors" />
            </Button>
          </div>
        </section>
      );
    }
    return <div>This User has not created a Readme Document Yet</div>;
  }

  return (
    <div className="relative my-4">
      <ReactMarkdown rehypePlugins={[rehypeRaw]} className="p-4">
        {Buffer.from(readMe).toString("utf-8")}
      </ReactMarkdown>

      <MarkdownEditor content={readMe}>
        {isUserProfile && (
          <Button variant={"ghost"} className="px-2 absolute top-0 right-0">
            <PencilSquareIcon className="w-8 h-8" />
          </Button>
        )}
      </MarkdownEditor>
    </div>
  );
};

export default ReadMe;

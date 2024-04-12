import React, { useEffect, useState } from "react";
import { useAccount } from "../../context/AccountProvider";
import { FileUploader } from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { UploadProfileReadMe } from "@/controllers/ProfileController";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { buffer } from "stream/consumers";

const ReadMe = () => {
  const { user, profile, setProfile } = useAccount();
  const readMe = profile?.readMe;
  if (!user || !profile) return null;

  const uploadReadMe = (file: File) => {
    //Ensure File Upload is of type .md
    if (file.type !== "text/markdown") {
      toast.error("Invalid File Type. Please upload a markdown file.", {
        position: "top-right",
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = Buffer.from(reader.result as ArrayBuffer);
      if (!content) return;

      //Upload Buffer to Database
      UploadProfileReadMe(content, user.id);
      //Update Locally
      setProfile({ ...profile, readMe: content });
    };
    reader.readAsArrayBuffer(file);
  };

  if (!readMe)
    return (
      <section className="flex flex-col items-center py-12 px-8">
        <h2 className="text-2xl font-bold">
          No ReadMe File Found for this Account
        </h2>
        <h3 className="text-secondary-header mt-2 max-w-md">
          Drag an existing markdown file in or click the Plus button to create a
          brand new one!
        </h3>
        <div className="w-full h-full relative">
          <FileUploader
            className="my-8 h-[30rem]"
            onFileUpload={uploadReadMe}
          />
          <Button
            className="absolute -right-6 top-2 rounded-full h-14 w-14 px-0 hover:bg-transparent"
            variant={"ghost"}
          >
            <PlusCircleIcon className="w-14 h-14 stroke-secondary-header rounded-full backdrop-blur-lg hover:stroke-primary transition-colors" />
          </Button>
        </div>
      </section>
    );

  return (
    <ReactMarkdown className={"m-4 "} rehypePlugins={[rehypeRaw]}>
      {Buffer.from(readMe).toString("utf-8")}
    </ReactMarkdown>
  );
};

export default ReadMe;

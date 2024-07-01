"use client";

import { Button } from "@/components/ui/button";
import { defaultPicture } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { useProfileViewer } from "../context/UserProfileProvider";
import { Skeleton } from "../ui/skeleton";
import { EditProfileModal } from "./EditProfileModal";
import ProfileDetails from "./ProfileDetails";
import ProfileFollowers from "./ProfileFollowers";

function ProfileHeader() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { fetchedAccount: account, isOwnProfile, loading } = useProfileViewer();
  if (!account && !loading) return null;

  //Find Profile and User object based on username string

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  return (
    <>
      <div className="rounded-lg lg:sticky p-6 mb-8 top-[7rem] flex flex-col items-center h-fit">
        <div className="relative z-10 flex justify-center">
          <div className="w-48 h-48 relative">
            {loading ? (
              <Skeleton className="rounded-full w-48 h-48" />
            ) : (
              <Image
                alt="User Profile Picture"
                className="rounded-full"
                priority
                src={account?.user?.image ?? defaultPicture}
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col items-center relative z-10 mt-4">
          {loading ? (
            <>
              <Skeleton className="w-32 h-8 mt-2 rounded-lg" />
              <Skeleton className="w-24 h-4 rounded-lg mt-4" />
              <div className="flex space-x-2">
                <Skeleton className="w-24 h-4 rounded-lg mt-6" />
                <Skeleton className="w-24 h-4 rounded-lg mt-6" />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-secondary-foreground">
                {account?.user?.name}
              </h1>

              <p className="text-secondary-header my-2">
                @{account?.user?.username}
              </p>
              <ProfileFollowers
                followers={account?.profile?.followers ?? 0}
                following={account?.profile?.following ?? 0}
              />
              {isOwnProfile ? (
                <Button
                  className="mt-6"
                  variant={"outline"}
                  onClick={toggleEditModal}
                >
                  Edit Profile
                </Button>
              ) : (
                <Button className="mt-6">Follow</Button>
              )}
            </>
          )}
        </div>
        <ProfileDetails />
      </div>
      <EditProfileModal open={isEditModalOpen} dispatch={setIsEditModalOpen} />
    </>
  );
}

export default ProfileHeader;

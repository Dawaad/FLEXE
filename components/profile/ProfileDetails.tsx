"use client";

import React from "react";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "lucide-react";
import { Building } from "lucide-react";
import { CircleDashed } from "lucide-react";
import { useAccount } from "../context/AccountProvider";
import { Separator } from "../ui/separator";
import { userProfileViewer } from "../context/UserProfileProvider";
import { Skeleton } from "../ui/skeleton";

const ProfileDetails = () => {
  const { fetchedProfile, loading } = userProfileViewer();
  const profileDetails = [
    {
      detail: fetchedProfile?.job,
      icon: <BriefcaseIcon className="stroke-secondary-header w-5 h-5" />,
    },
    {
      detail: fetchedProfile?.company,
      icon: <Building className="stroke-secondary-header w-5 h-5" />,
    },
    {
      detail: fetchedProfile?.pronouns,
      icon: <CircleDashed className="stroke-secondary-header w-5 h-5" />,
    },
    {
      detail: fetchedProfile?.location,
      icon: <MapPinIcon className="stroke-secondary-header w-5 h-5" />,
    },
  ];

  return (
    <div className="flex flex-col mt-1">
      {loading ? (
        <Skeleton className="h-12 w-full my-2 mt-8" />
      ) : (
        <div className="flex flex-col items-center">
          <Separator className="mt-4" />
          <p className="text-xs py-2 text-gray-200 text-wrap text-secondary-foreground">
            Bio bio bio bio bio bio bio bio bio bio bio bio bio bio
          </p>
          <Separator className="mb-4" />
        </div>
      )}
      {loading ? (
        <div className="flex flex-col space-y-4 mt-8">
          {profileDetails.map((_, index) => (
            <Skeleton key={`profile-skeleton-${index}`} className="w-5/6 h-4" />
          ))}
        </div>
      ) : (
        <>
          {profileDetails.map((item, index) => {
            if (item.detail) {
              return (
                <div
                  key={`profile-item-${index}`}
                  className="flex flex-row align-center items-center my-1"
                >
                  {item.icon}
                  <p className="ml-2 text-xs text-secondary-foreground">
                    {" "}
                    {item.detail}
                  </p>
                </div>
              );
            }
          })}
        </>
      )}
    </div>
  );
};

export default ProfileDetails;

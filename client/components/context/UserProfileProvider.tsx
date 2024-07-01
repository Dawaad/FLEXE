"use client";

import { useAccount } from "@/components/context/AccountProvider";
import { FindAccountByUsername } from "@/controllers/UserController";
import { ChildNodeProps, UserAccount } from "@/lib/interface";
import { useParams } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import ErrorPage from "../Error";

interface ProfileViewerProviderState {
  isOwnProfile: boolean;
  fetchedAccount?: UserAccount;
  loading: boolean;
  setFetchedAccount: React.Dispatch<
    React.SetStateAction<UserAccount | undefined>
  >;
}

const initialState: ProfileViewerProviderState = {
  isOwnProfile: false,
  fetchedAccount: undefined,
  loading: true,
  setFetchedAccount: () => {},
};

export const ProfileViewerContext =
  createContext<ProfileViewerProviderState>(initialState);

export const ProviderViewerProvider = ({ children }: ChildNodeProps) => {
  const { user, profile, mediaPosts, textPosts } = useAccount();
  const params = useParams<{ username: string; tag: string }>();

  const [isOwnProfile, setisOwnProfile] = useState(false);
  const [fetchedAccount, setFetchedAccount] = useState<
    UserAccount | undefined
  >();
  const [loading, setLoading] = useState<boolean>(true);
  const fetchProfileDetails = async (username: string) => {
    try {
      const account = await FindAccountByUsername(username);
      if (account) {
        setFetchedAccount(account);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    const { username } = params;
    //Check whether or not the user name is the current user or if the user is visiting another profile
    if (username === user?.username) {
      setFetchedAccount({
        user: user,
        profile: profile,
        mediaPosts: mediaPosts,
        textPosts: textPosts,
      });
      setisOwnProfile(true);
      setLoading(false);
    } else {
      fetchProfileDetails(username);
    }
  }, [user, profile]);

  useEffect(() => {
    if (!isOwnProfile || !user) return;

    setFetchedAccount({
      user: user,
      profile: profile,
      mediaPosts: mediaPosts,
      textPosts: textPosts,
    });
  }, [textPosts, mediaPosts, profile, user]);

  return (
    <ProfileViewerContext.Provider
      value={{
        loading,
        fetchedAccount,
        setFetchedAccount,
        isOwnProfile,
      }}
    >
      {!loading && !fetchedAccount ? <ErrorPage /> : children}
    </ProfileViewerContext.Provider>
  );
};

export const useProfileViewer = () => {
  const context = React.useContext(ProfileViewerContext);
  if (context === undefined) {
    throw new Error(
      "useProfileViewer must be used within a ProfileViewerProvider"
    );
  }
  return context;
};

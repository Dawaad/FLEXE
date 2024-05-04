import { User } from "next-auth";
import { UserProfile, UserPost, PostContent } from "@prisma/client";

export interface ClassNameProp {
  className?: string;
}

export interface LinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  restrict?: boolean;
}

export interface SidebarButtonProps extends ClassNameProp {
  callback: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChildNodeProps {
  children?: React.ReactNode;
}

//Profile Interfaces
export interface LoadingProps {
  loading: boolean;
}

export interface UserObject extends LoadingProps {
  user: User | undefined;
}

export interface ProfileObject extends LoadingProps {
  profile: UserProfile | undefined;
}

export interface PostObject extends LoadingProps {
  userPosts: UserPost[];
}

export type PostCreationContent = Omit<PostContent, "id">;

export interface CreatePost {
  content: PostCreationContent;
  file: File;
}

export interface PostContentBlock {
  id: string;
  content: React.ReactNode;
}

export interface ContentBlockProp {
  id: string;
  value: string;
  valueCallback: (value: string) => void;
  onDelete: (id: string) => void;
}

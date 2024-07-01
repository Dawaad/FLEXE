import { PencilIcon } from "@heroicons/react/24/outline";
import { User } from "next-auth";
import { CSSProperties } from "react";
export interface ClassNameProp {
  className?: string;
}

export interface LinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  restrict?: boolean;
}

export type IconType = typeof PencilIcon;
export interface ModalProps {
  open: boolean;
  callback: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SidebarButtonProps extends ClassNameProp {
  callback: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChildNodeProps {
  children?: React.ReactNode;
}

export interface UserAccount {
  user: User;
  profile?: UserProfile;
  mediaPosts: UserPost[];
  textPosts: UserTextPost[];
}

//User Profile Object
export interface UserProfile {
  id: string;
  userId: string;
  job?: string;
  followers: number;
  following: number;
  company?: string;
  pronouns?: string;
  location?: string;
  bio?: string;
  external: ProfileExternalLinks;
}

export interface ProfileExternalLinks {
  website?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

//Post Interfaces
export type PostType = "TEXT" | "MEDIA";

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

export interface PostUserMedia {
  content: PostContent;
  file?: File;
}

export interface PostContent {
  id: string;
  location: string;
  format: PostContentType;
  width: number;
  height: number;
  alt: string;
  uploaded: boolean;
}

export interface PostUserMediaThumbnail {
  thumbnail: string | undefined;
  contentID: string;
}

export type ContentType = "text" | "image" | "video" | "carousel";

export interface ContentStyling {
  id: string;
  type: ContentType;
}

export interface ContentBlockOptions {
  playOnHover?: boolean;
  carouselAutoplay?: boolean;
  carouselLoop?: boolean;
  carouselStopOnMouseEnter?: boolean;
  carouselDuration?: number;
  activeIndex?: number;
}

export type OptionKeys = keyof ContentBlockOptions;
export type OptionKeyValues = ContentBlockOptions[OptionKeys];

export interface ContentValue {
  contentValue: string | PostUserMedia | PostUserMedia[];
}

export interface ContentBlockProp {
  id: string;
  value?: ContentValue;
  style?: CSSProperties;
  options?: ContentBlockOptions;
  type?: ContentBlockType;
}

export type ContentComponent = (props: ContentBlockProp) => React.JSX.Element;

export interface ToolValueObject<T> {
  icon: React.ReactNode;
  value: T;
  tooltip?: string;
}

export type Document = ContentBlockProp[];

export interface PostAuxilliaryData {
  userID: string;
  dateCreated: Date;
  dateUpdated?: Date;
  postStatus: PostStatus;
  title: string;
  tags: string[];
  tech: string[];
  thumbnail: string;
}

export interface PostExternalData {
  likeCount: number;
  commentCount: number;
  viewCount: number;
  saveCount: number;
}

export interface UserPost {
  id: string | undefined;
  document: Document;
  auxData: PostAuxilliaryData;
  externalData: PostExternalData;
}

export interface UserTextPost {
  id: string | undefined;
  userID: string;
  textpost: string;
  createdAt: Date;
  externalData: PostExternalData;
}

export enum PostContentType {
  "IMAGE",
  "VIDEO",
  "GIF",
}

const postStatuses = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;
export type PostStatus = (typeof postStatuses)[number];

const contentBlockTypes = [
  "TEXT",
  "IMAGE",
  "VIDEO",
  "CAROUSEL",
  "PREVIEW",
] as const;
export type ContentBlockType = (typeof contentBlockTypes)[number];

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  parentId?: string;
  dateCreated: Date;
  dateUpdated?: Date;
  likes: number;
  dislikes: number;
}

export interface CommentNode {
  comment: Comment;
  children: CommentNode[];
}

export interface CommentTree {
  root: CommentNode;
}

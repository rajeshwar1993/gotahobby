import { Entity } from "./generics";

export enum PictureType {
  PROFILE_PICTURE = "PROFILE_PICTURE",
  GROUP_BANNER = "GROUP_BANNER",
  GROUP_GALLERY = "GROUP_GALLERY",
  EVENT_BANNER = "EVENT_BANNER",
  EVENT_GALLERY = "EVENT_GALLERY",
}

export type Picture = Entity & {
  type: PictureType;
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  size?: number;
  createdAt: string;
};

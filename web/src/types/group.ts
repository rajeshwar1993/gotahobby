import {
  Bio,
  Entity,
  GlanceUser,
  Picture,
  Tag,
  TimeStats,
  Event,
} from "@/types";

export type GroupBasic = Entity &
  TimeStats & {
    name: string;
    coverPicture?: Picture;
  };

export type NewGroupResponse = Entity;

export type Group = GroupBasic & {
  bio: Bio;
  location: string;
  photos: Array<Picture>;
  tags: Array<Tag>;
  memberCount: number;
  events: Event[];
  hosts: Array<GlanceUser>;
  discussion: Comment[];
  members: Array<GlanceUser>;
};

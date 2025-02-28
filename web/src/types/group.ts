import { Bio, Entity, GlanceUser, Picture, Tag, TimeStats } from "@/types";

export type GroupBasic = Entity &
  TimeStats & {
    name: string;
    coverPicture: Picture;
  };

export type NewGroupResponse = Entity & {
  name: string;
};

export type Group = GroupBasic & {
  bio: Bio;
  tags: Array<Tag>;
  members: Array<GlanceUser>;
};

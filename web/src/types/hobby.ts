import { Bio, Entity, GlanceUser, Picture, Tag } from "@/types";

export type HobbyBasic = Entity & {
  name: string;
  coverPicture: Picture;
};

export type Hobby = HobbyBasic & {
  bio: Bio;
  tags: Array<Tag>;
  members: Array<GlanceUser>;
};

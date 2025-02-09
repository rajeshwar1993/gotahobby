import { Bio, Entity, GlanceUser, Picture, Tag, TimeStats } from "@/types";

export type HobbyBasic = Entity &
  TimeStats & {
    name: string;
    coverPicture: Picture;
  };

export type NewHobbyResponse = Entity & {
  name: string;
};

export type Hobby = HobbyBasic & {
  bio: Bio;
  tags: Array<Tag>;
  members: Array<GlanceUser>;
};

export type HobbyBasic = Entity & {
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

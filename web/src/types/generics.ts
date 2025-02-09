export type Entity = {
  uuid: string;
};

export type TimeStats = {
  createdAtUTC: string;
};

export type Bio = {
  text: string;
};

export type Picture = {
  url: string;
  alt: string;
  caption: string;
};

export type Tag = Entity & {
  text: string;
};

export type GlanceUser = Entity & {
  name: string;
  picture: Picture;
};

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

export type EventLocation = {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
};

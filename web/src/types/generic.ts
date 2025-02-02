export type Entity = {
  uuid: string;
};

export type Picture = {
  url: string;
  alt: string;
  caption?: string;
};

export type Email = {
  id: string;
  verified: boolean;
};

export type Phone = {
  ext: string;
  num: string;
  verified: boolean;
};

export type Bio = {
  text: string;
};

export type Interest = {
  uuid: string;
  text: string;
};

export type Tag = {
  uuid: string;
  text: string;
};

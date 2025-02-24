export type Entity = {
  uuid: string;
};

export type TimeStats = {
  createdAtUTC: string;
};

export type Bio = {
  text: string;
};

enum PictureType {
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

export type Tag = Entity & {
  value: string;
};

export type GlanceUser = Entity & {
  name: string;
  picture: Picture;
};

// types/notifications.ts
export type NotificationType =
  | "event_reminder"
  | "new_attendee"
  | "event_update"
  | "message"
  | "system";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  image?: string;
};

export type CurrencyAmount = {
  amount: number;
  currency: string;
};

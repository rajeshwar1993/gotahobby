export type Entity = {
  uuid: string;
};

export type TimeStats = {
  createdAtUTC: string;
  lastLoginAtUTC?: string;
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

export type Price = {
  amount: number;
  currency: string;
};

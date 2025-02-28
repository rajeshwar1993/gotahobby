export type Entity = {
  id: string;
};

export type TimeStats = {
  createdAtUTC: string;
};

export type Bio = {
  text: string;
};

export type Tag = Entity & {
  value: string;
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

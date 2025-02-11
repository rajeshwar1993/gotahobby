import { Bio, Entity, Picture, Tag, TimeStats } from "./generics";

export type EventBasic = Entity &
  TimeStats & {
    title: string;
    coverPicture: Picture;
  };

export type NewEventResponse = Entity &
  TimeStats & {
    name: string;
  };

export type Event = EventBasic & {
  bio: Bio;
  tags: Array<Tag>;

  // TODO types
  //   location
  //   timings
  //   hobbyGroup: // ID of the group
  //   attendies
  //   host
  //   discussion
  //   photos
  //   capacity: number;
  // status: 'draft' | 'published' | 'cancelled' | 'completed';
  //   price: {
  //     amount: number;
  //     currency: string;
  //   };

  // isPublic: boolean;
};

type EventAttendee = {
  id: string;
  name: string;
  email: string;
  registrationDate: Date;
  status: "confirmed" | "pending" | "cancelled";
  ticketType: string;
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

import {
  Bio,
  Entity,
  GlanceUser,
  Picture,
  CurrencyAmount,
  Tag,
  TimeStats,
} from "./generics";

export type EventBasic = Entity &
  TimeStats & {
    title: string;
    coverPicture: Picture;
  };

export type NewEventResponse = Entity &
  TimeStats & {
    title: string;
  };

enum EventLocationType {
  OFFLINE = "OFFLINE",
  ONLINE = "ONLINE",
  BOTH = "BOTH",
}

type OfflineEventLocation = {
  address: string;
  city?: string;
  state?: string;
  country: string;
  postalCode?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  mapLocationUrl?: string;
};

type OnlineEventLocation = {
  conferenceURL: string;
  conferencePassord?: string;
};

type EventLocation =
  | {
      tbd: true;
      location: null;
    }
  | {
      tdb: false;
      location:
        | {
            type: EventLocationType.OFFLINE;
            details: OfflineEventLocation;
          }
        | {
            type: EventLocationType.ONLINE;
            details: OnlineEventLocation;
          }
        | {
            type: EventLocationType.BOTH;
            offlineDetails: OfflineEventLocation;
            onlineDetails: OnlineEventLocation;
          };
    };

type EventTiming =
  | {
      tbd: false;
      startDate: string;
      endDate: string;
    }
  | { tbd: true };

enum AttendeeStatus {
  CONFIRMED = "confirmed",
  WAITING = "waiting",
  CANCELLED = "cancelled",
  APPLIED = "applied",
}

type EventAttendee = {
  uuid: string;
  name: string;
  picture: string;
  registrationDate: string;
  status: AttendeeStatus;
};

enum EventStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  CANCELLED = "cancelled",
  FINISHED = "finished",
}

export type Event = EventBasic & {
  bio: Bio;
  bannerImage: Picture;
  tags: Array<Tag>;
  timing: EventTiming;
  location: EventLocation;
  groupID: string;
  attendies: EventAttendee[];
  host: GlanceUser[];
  //   discussion
  photos: Picture[];
  capacity: number;
  status: EventStatus;
  fee: CurrencyAmount;
  isPublic: boolean;
};

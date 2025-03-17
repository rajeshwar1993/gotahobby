import { Event } from "@/types/event";
import {
  Bio,
  CurrencyAmount,
  Entity,
  GlanceUser,
  Picture,
  PictureType,
  Tag,
  TimeStats,
} from "@/types";
import { Database } from "./database.types";

type dbEvent = Database["public"]["Tables"]["event"]["Row"];
type UpdateEvent = Database["public"]["Tables"]["event"]["Update"];
type DBPicture = Database["public"]["Tables"]["picture"]["Row"];

export function picture_DBToObj(supaPicture: DBPicture): Picture {
  return {
    id: supaPicture.id,
    type: supaPicture.type as PictureType, // Using PictureType enum
    src: supaPicture.src,
    alt: supaPicture.alt || "",
    caption: supaPicture.caption || "",
    width: supaPicture.width || 0,
    height: supaPicture.height || 0,
    size: supaPicture.size || 0,
    createdAt: supaPicture.created_at,
  };
}

export function event_DBToObj({
  dbEvent,
  bannerImage,
  tags,
  hosts,
  photos,
}: {
  dbEvent: dbEvent;
  bannerImage?: Picture;
  tags: Tag[];
  hosts: GlanceUser[];
  photos: Picture[];
}): Event {
  // 1. Basic entity and time stats transformation
  const basicInfo: Entity & TimeStats = {
    id: dbEvent.id,
    created_at: dbEvent.created_at,
  };

  // 3. Transform bio
  const bio: Bio = dbEvent.bio as Bio;

  // 5. Transform timing from JSON
  const timing = dbEvent.timings
    ? typeof dbEvent.timings === "string"
      ? JSON.parse(dbEvent.timings)
      : dbEvent.timings
    : { tbd: true };

  // 6. Transform location from JSON
  const location = dbEvent.location
    ? typeof dbEvent.location === "string"
      ? JSON.parse(dbEvent.location)
      : dbEvent.location
    : { tbd: true, location: null };

  // 8. Transform fee from JSON
  const fee: CurrencyAmount = dbEvent.fee
    ? typeof dbEvent.fee === "string"
      ? JSON.parse(dbEvent.fee)
      : (dbEvent.fee as CurrencyAmount)
    : { amount: 0, currency: "USD" };

  // 9. Combine everything into the Event type
  return {
    ...basicInfo,
    title: dbEvent.title,
    bio,
    bannerImage,
    tags,
    timing,
    location,
    groupID: dbEvent.groupId || "",
    attendies: [], // Would need to fetch from a separate table
    host: hosts,
    flagDates: {
      rsvpStart: "", // TODO: Add this to the database
      rsvpEnd: "",
    },
    photos,
    discussion: [], // Would need to fetch from a separate table
    capacity: dbEvent.capacity || 0,
    status: dbEvent.status || ("draft" as any), // Using string as enum value
    fee,
    isPublic: dbEvent.isPublic || false,
  };
}

export function event_ObjToDB(event: Partial<Event>): UpdateEvent {
  const dbData: UpdateEvent = {
    title: event.title,
    bio: event.bio,
    timings: event.timing ? JSON.stringify(event.timing) : undefined,
    location: event.location ? JSON.stringify(event.location) : undefined,
    capacity: event.capacity,
    status: event.status,
    fee: event.fee ? JSON.stringify(event.fee) : undefined,
    isPublic: event.isPublic,
  };
  return dbData;
}

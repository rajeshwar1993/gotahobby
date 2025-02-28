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
}: {
  dbEvent: dbEvent;
  bannerImage?: Picture;
  tags: Tag[];
  hosts: GlanceUser[];
}): Event {
  // 1. Basic entity and time stats transformation
  const basicInfo: Entity & TimeStats = {
    id: dbEvent.id,
    createdAtUTC: dbEvent.created_at,
  };

  // 3. Transform bio
  const bio: Bio = {
    text: dbEvent.bio || "",
  };

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
    photos: [], // Would need to fetch from picture table
    capacity: dbEvent.capacity || 0,
    status: dbEvent.status || ("draft" as any), // Using string as enum value
    fee,
    isPublic: dbEvent.isPublic || false,
  };
}

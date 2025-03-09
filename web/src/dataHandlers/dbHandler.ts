import { Group } from "@/types/group";
import { Event } from "@/types/event";
import { Picture } from "@/types/picture";
import { DBHandlerType } from "@/types/dbHandler";
import { Database } from "./supabase/database.types";
import { Tag } from "@/types";

type UpdateEvent = Database["public"]["Tables"]["event"]["Update"];

export abstract class DBHandler {
  constructor() {}

  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract getPictureById(
    query: { type: "single"; id: string } | { type: "multiple"; ids: string[] }
  ): Promise<Picture | Picture[]>;
  abstract getAllGroups(): Promise<Group[]>;
  abstract getGroupById(groupId: string): Promise<Group>;
  abstract getEventById(eventId: string): Promise<Event>;
  abstract getAllEventsOfGroup(groupId: string): Promise<Event[] | null>;

  // Optional methods used in API routes
  abstract createEvent(
    eventName: string,
    groupId: string
  ): Promise<{ id: string }>;

  abstract updateEvent(eventId: string, data: UpdateEvent): Promise<void>;
  abstract deleteEvent(eventId: string): Promise<void>;

  abstract getTagById(tagId: string): Promise<Tag>;
  abstract createTag(value: string): Promise<Tag>;
}

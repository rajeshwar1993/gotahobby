import { Database } from "./supabase/database.types";
import { Tag, Comment, Picture, Event, Group } from "@/types";

type InsertComment = Database["public"]["Tables"]["comment"]["Insert"];
type UpdateGroup = Database["public"]["Tables"]["group"]["Update"];
type UpdateEvent = Database["public"]["Tables"]["event"]["Update"];
type PictureInsert = Database["public"]["Tables"]["picture"]["Insert"];

export abstract class DBHandler {
  constructor() {}
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

  abstract createGroup(data: {
    title?: string;
    createdBy: string;
  }): Promise<{ id: string }>;

  abstract updateGroup(eventId: string, data: UpdateGroup): Promise<void>;
  abstract updateEvent(eventId: string, data: UpdateEvent): Promise<void>;
  abstract deleteEvent(eventId: string): Promise<void>;

  abstract getTagById(tagId: string): Promise<Tag>;
  abstract createTag(value: string): Promise<Tag>;

  abstract createNewImage(data: PictureInsert): Promise<boolean>;
  abstract getComemntsByIDs(commentIds: string[]): Promise<Comment[]>;
  abstract createNewComment(data: InsertComment): Promise<{ id: string }>;
}

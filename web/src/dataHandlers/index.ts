import { MockDataHandler } from "./mockFetcher";
import { SupabaseHandler } from "./supabase";
import { DBHandlerType, Group, Picture } from "@/types";
import { Event } from "@/types/event";

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

  static async create(env: "supabase" | "local" = "local") {
    return new SupabaseHandler();
  }
}

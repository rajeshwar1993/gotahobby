import { Logger } from "@/utils/supabase/logger";
import { MockDataHandler } from "./mockFetcher";
import { SupabaseHandler } from "./supabase";
import { DBHandlerType, Group } from "@/types";

export abstract class DBHandler implements DBHandlerType {
  constructor() {}

  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract getAllGroups(): Promise<Group[]>;
  abstract getGroupById(groupId: string): Promise<Group>;
  abstract getEventById(eventId: string): Promise<Event | null>;
  abstract getAllEventsOfGroup(groupId: string): Promise<Event[] | null>;

  static async create(env: "supabase" | "local" = "local") {
    if (env === "supabase") {
      return new SupabaseHandler();
    }
    return new MockDataHandler();
  }
}

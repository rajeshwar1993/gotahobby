import { Database as SupaDatabase } from "@/dataHandlers/supabase/database.types";
import { Group } from "@/types/group";
import axios from "axios";
import { createClient } from "@/utils/supabase/server";
import { DBHandler } from "..";
import { SupabaseClient } from "@supabase/supabase-js";
import { Logger } from "@/utils/supabase/logger";

export class SupabaseHandler extends DBHandler {
  private logger;
  private supabaseClient: SupabaseClient<SupaDatabase> | null = null;
  constructor() {
    super();
    this.logger = new Logger();
  }

  async connect() {
    this.supabaseClient = await createClient<SupaDatabase>();
  }

  async disconnect() {
    this.supabaseClient = null;
  }

  async getAllGroups(): Promise<Group[]> {
    const response = await axios.get("http://localhost:3090/api/groups/all");

    return response.data;
  }

  async getGroupById(groupId: string): Promise<Group> {
    const response = await axios.get("http://localhost:3090/api/group");

    return response.data;
  }

  async getEventById(eventId: string): Promise<Event | null> {
    try {
      if (!this.supabaseClient) {
        throw new Error("Supabase client not initialized");
      }

      const { data: event, error } = await this.supabaseClient
        .from("event")
        .select("*")
        .eq("id", eventId)
        .single();

      if (error) {
        throw error;
      }

      const evebtData: Event = transformDBEventToEvent(event);

      return evebtData;
    } catch (error) {
      this.logger.info("getEventById", error);
      return null;
    }
  }

  async getAllEventsOfGroup(groupId: string): Promise<Event[] | null> {
    try {
      if (!this.supabaseClient) {
        throw new Error("Supabase client not initialized");
      }

      const { data: events, error } = await this.supabaseClient
        .from("event")
        .select("*")
        .eq("group_id", groupId);

      console.log(events, error);

      return events;
    } catch (error) {
      this.logger.info("getAllEventsOfGroup", error);
      return null;
    }
  }
}

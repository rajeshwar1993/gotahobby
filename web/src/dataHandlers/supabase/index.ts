import { Database as SupaDatabase } from "@/database.types";
import { Group } from "@/types/group";
import { SupabaseClient } from "@supabase/supabase-js";
import axios from "axios";
import { createClient } from "@/utils/supabase/server";
import { DBHandler } from "..";

export class SupabaseHandler extends DBHandler {
  private supabaseClient: any;
  constructor() {
    super();
  }

  async connect() {
    this.supabaseClient = createClient();
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

  async getEventById(eventId: string): Promise<Event> {
    let { data: event, error } = await this.supabaseClient
      .from("event")
      .select("*")
      .eq("id", eventId)
      .single();

    console.log(event, error);

    return event;
  }

  async getAllEventsOfGroup(groupId: string): Promise<Event[]> {
    let { data: events, error } = await this.supabaseClient
      .from("event")
      .select("*")
      .eq("group_id", groupId);

    console.log(events, error);

    return events;
  }
}

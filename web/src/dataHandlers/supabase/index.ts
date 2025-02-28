import { Database as SupaDatabase } from "@/database.types";
import { DBHandlerType } from "@/types/dbHandler";
import { Group } from "@/types/group";
import { SupabaseClient } from "@supabase/supabase-js";
import axios from "axios";

export class SupabaseHandler implements DBHandlerType {
  supabaseClient;
  constructor(client: SupabaseClient<SupaDatabase>) {
    this.supabaseClient = client;
  }

  async getAllGroups(): Promise<Group[]> {
    const response = await axios.get("http://localhost:3090/api/groups/all");

    return response.data;
  }

  async getGroup(): Promise<Group> {
    const response = await axios.get("http://localhost:3090/api/group");

    return response.data;
  }

  async getEvent(id: string): Promise<Event> {
    let { data: event, error } = await this.supabaseClient
      .from("event")
      .select("*")
      .eq("id", id)
      .single();

    console.log(event, error);

    return event;
  }
}

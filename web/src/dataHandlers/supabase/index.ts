import { Database as SupaDatabase } from "@/database.types";
import { DBHandlerType } from "@/types/dbHandler";
import { Hobby } from "@/types/hobby";
import { SupabaseClient } from "@supabase/supabase-js";
import axios from "axios";

export class SupabaseHandler implements DBHandlerType {
  supabaseClient;
  constructor(client: SupabaseClient<SupaDatabase>) {
    this.supabaseClient = client;
  }

  async getAllHobbies(): Promise<Hobby[]> {
    const response = await axios.get("http://localhost:3090/api/hobbies/all");

    return response.data;
  }

  async getHobby(): Promise<Hobby> {
    const response = await axios.get("http://localhost:3090/api/hobby");

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

import { Database as SupaDatabase } from "@/database.types";
import { MockDataHandler } from "./mockFetcher";
import { FirebaseHandler } from "./firebase";
import { SupabaseHandler } from "./supabase";
import { createClient } from "@/utils/supabase/server";
import { DBHandlerType } from "@/types";

export abstract class DBHandler implements DBHandlerType {
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract getAllHobbies(): Promise<Hobby[]>;
  abstract getHobby(id: string): Promise<Hobby>;
  abstract getEvent(id: string): Promise<Event>;

  static async create(env: "firebase" | "supabase" | "local" = "local") {
    if (env === "firebase") {
      return new FirebaseHandler();
    } else if (env === "supabase") {
      return new SupabaseHandler(await createClient<SupaDatabase>());
    }
    return new MockDataHandler();
  }
}

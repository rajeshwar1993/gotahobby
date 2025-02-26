import { Database as SupaDatabase } from "@/database.types";
import { MockDataHandler } from "./mockFetcher";
import { FirebaseHandler } from "./firebase";
import { SupabaseHandler } from "./supabase";
import { createClient } from "@/utils/supabase/server";

export class DBHandler {
  static async get(env: string = "local") {
    if (env === "firebase") {
      return new FirebaseHandler();
    } else if (env === "supabase") {
      return new SupabaseHandler(await createClient<SupaDatabase>());
    }
    return new MockDataHandler();
  }
}

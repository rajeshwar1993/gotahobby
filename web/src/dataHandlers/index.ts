import { SupabaseHandler } from "./supabase";
import { DBHandler } from "./dbHandler";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database as SupaDatabase } from "@/dataHandlers/supabase/database.types";

export async function createDBHandler(
  env: "supabase" | "local" = "local",
  client: SupabaseClient<SupaDatabase>
): Promise<DBHandler> {
  return new SupabaseHandler(client);
}

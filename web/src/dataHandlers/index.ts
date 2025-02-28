import { MockDataHandler } from "./mockFetcher";
import { SupabaseHandler } from "./supabase";
import { DBHandler } from "./dbHandler";

export { DBHandler };

export async function createDBHandler(
  env: "supabase" | "local" = "local"
): Promise<DBHandler> {
  return new SupabaseHandler();
}

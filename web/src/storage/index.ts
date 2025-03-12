import { PictureType } from "@/types";
import { StorageHandler } from "./storageHandler";
import { SupabaseStorageHandler } from "./supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database as SupaDatabase } from "@/dataHandlers/supabase/database.types";

export type ImageStorageInput = {
  file: File;
  pictureType: PictureType;
  parentId: string;
  entityId: string;
};

export async function createStorageHandler(
  env: "supabase" | "local" = "local",
  client: SupabaseClient<SupaDatabase>
): Promise<StorageHandler> {
  return new SupabaseStorageHandler(client);
}

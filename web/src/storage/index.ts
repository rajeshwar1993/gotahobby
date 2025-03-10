import { PictureType } from "@/types";
import { StorageHandler } from "./storageHandler";
import { SupabaseStorageHandler } from "./supabase";

export type ImageStorageInput = {
  file: File;
  pictureType: PictureType;
  parentId: string;
  entityId: string;
};

export async function createStorageHandler(
  env: "supabase" | "local" = "local"
): Promise<StorageHandler> {
  return new SupabaseStorageHandler();
}

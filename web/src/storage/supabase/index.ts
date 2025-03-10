import { Logger } from "@/utils/supabase/logger";
import { StorageHandler, UploadResponse } from "../storageHandler";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { ImageStorageInput } from "..";
import { PictureType } from "@/types";

export class SupabaseStorageHandler extends StorageHandler {
  private logger;
  private supabaseClient: SupabaseClient | null = null;
  private bucketName = "images";
  constructor() {
    super();
    this.logger = new Logger();
  }

  async connect() {
    this.supabaseClient = await createClient();
  }

  async disconnect() {
    this.supabaseClient = null;
  }

  async uploadImage({
    file,
    pictureType,
    parentId,
    entityId,
  }: ImageStorageInput): Promise<UploadResponse> {
    if (!this.supabaseClient) {
      throw new Error("Supabase client not initialized");
    }

    let path = "";
    let upsert = false;
    const cacheControl = "3600";

    switch (pictureType) {
      case PictureType.PROFILE_PICTURE:
        path = `public/user/${parentId}/profile/profile_piture.png`;
        upsert = true;
        break;
      case PictureType.EVENT_GALLERY:
        path = `public/event/${parentId}/gallery/${PictureType.EVENT_GALLERY}_${entityId}.png`;
        break;
      case PictureType.EVENT_BANNER:
        path = `public/event/${parentId}/cover/${PictureType.EVENT_BANNER}.png`;
        upsert = true;
        break;
      case PictureType.GROUP_GALLERY:
        path = `public/group/${parentId}/gallery/${PictureType.GROUP_GALLERY}_${entityId}.png`;
        break;
      case PictureType.GROUP_BANNER:
        path = `public/group/${parentId}/cover/${PictureType.GROUP_BANNER}.png`;
        upsert = true;
        break;
      default:
        throw new Error("Invalid picture type");
    }

    const { data, error } = await this.supabaseClient.storage
      .from(this.bucketName)
      .upload(path, file, {
        cacheControl,
        upsert,
      });

    if (error) {
      this.logger.error("uploadEventGalleryImage", error);
      throw error;
    }

    return data;
  }
}

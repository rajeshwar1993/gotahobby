"use server";

import { redirect } from "next/navigation";
import { Picture, PictureType } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { Database as SupaDatabase } from "@/dataHandlers/supabase/database.types";
import { createStorageHandler } from "@/storage";
import { v4 as uuidv4 } from "uuid";
import { Logger } from "@/utils/supabase/logger";

export async function handleEventImageUpload(formData: FormData) {
  let eventId = "";
  const logger = new Logger();
  try {
    const pictureType = formData.get("pictureType") as PictureType;
    eventId = formData.get("eventId") as string;
    const files = formData.getAll("files") as File[];

    // TODO: validate body using zod

    // create client

    const supabaseClient = await createClient<SupaDatabase>();
    const storageHandler = await createStorageHandler(
      "supabase",
      supabaseClient
    );

    const pictures: Picture[] = [];

    for (const file of files) {
      const entityId = uuidv4();
      // save into storage
      const storageResult = await storageHandler.uploadImage({
        file,
        pictureType,
        parentId: eventId,
        entityId,
      });

      const publicUrl = await storageHandler.getPublicImageURL(
        storageResult.path
      );

      // save to db

      console.log("publicUrl: ", publicUrl);
    }
  } catch (error: unknown) {
    logger.error("Error uploading image", error);
  }
  if (eventId) redirect(`/event/${eventId}`);
}

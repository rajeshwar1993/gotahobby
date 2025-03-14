"use server";

import { redirect } from "next/navigation";
import { PictureType } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { Database as SupaDatabase } from "@/dataHandlers/supabase/database.types";
import { createStorageHandler } from "@/storage";
import { v4 as uuidv4 } from "uuid";
import { Logger } from "@/utils/supabase/logger";
import { SupabaseClient } from "@supabase/supabase-js";
import { createDBHandler } from "@/dataHandlers";

const saveSingleImage = async (
  supabaseClient: SupabaseClient<SupaDatabase>,
  entityId: string,
  pictureType: PictureType,
  file: File,
  parentId: string
) => {
  try {
    const storageHandler = await createStorageHandler(
      "supabase",
      supabaseClient
    );

    // TODO: reduce image size
    // TODO: convert image to webp

    // save into storage
    const storageResult = await storageHandler.uploadImage({
      file,
      pictureType,
      parentId,
      entityId,
    });
    const publicUrl = await storageHandler.getPublicImageURL(
      storageResult.path
    );

    // save to image table
    const dbHandler = await createDBHandler("supabase", supabaseClient);
    dbHandler.createNewImage({
      id: entityId,
      associatedTo: parentId,
      type: pictureType,
      src: publicUrl,
    });
    return { [entityId]: true };
  } catch (error: unknown) {
    return { [entityId]: false };
  }
};

async function handleImageUpload(
  supabaseClient: SupabaseClient<SupaDatabase>,
  imageFiles: File[],
  pictureType: PictureType,
  parentId: string
) {
  const imageOps: [string, Promise<{ [key: string]: boolean }>][] = [];

  for (const file of imageFiles) {
    const entityId = uuidv4();
    imageOps.push([
      entityId,
      saveSingleImage(supabaseClient, entityId, pictureType, file, parentId),
    ]);
  }

  const results = await Promise.allSettled(imageOps.map((op) => op[1]));

  const imageUUIDToStore: string[] = [];

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      throw new Error("Error uploading image", result.reason);
    }

    const eventId = imageOps[index][0];
    const imgOpRes = result.value;
    if (!imgOpRes[eventId]) {
      throw new Error("Image <-> Op missmatch");
    }

    imageUUIDToStore.push(eventId);
  });

  return imageUUIDToStore;
}

export async function handleEventImageUpload(formData: FormData) {
  const logger = new Logger();
  let eventId = "";

  try {
    const pictureType = formData.get("pictureType") as PictureType;
    eventId = formData.get("eventId") as string;
    const files = formData.getAll("files") as File[];

    // TODO: think about how to implement loading state for form submission

    // TODO: validate body using zod

    // create client
    const supabaseClient = await createClient<SupaDatabase>();

    const imageUUIDToStore = await handleImageUpload(
      supabaseClient,
      files,
      pictureType,
      eventId
    );

    // store image UUIDs in event table
    const dbHandler = await createDBHandler("supabase", supabaseClient);

    await dbHandler.updateEvent(eventId, {
      photos: imageUUIDToStore,
    });
  } catch (error: unknown) {
    logger.error("Error uploading image", error);
  }
  if (eventId) redirect(`/event/${eventId}`);
}

export async function handleGroupImageUpload(formData: FormData) {
  const logger = new Logger();
  let groupId = "";

  try {
    const pictureType = formData.get("pictureType") as PictureType;
    groupId = formData.get("groupId") as string;
    const files = formData.getAll("files") as File[];

    // TODO: think about how to implement loading state for form submission

    // TODO: validate body using zod

    // create client
    const supabaseClient = await createClient<SupaDatabase>();

    const imageUUIDToStore = await handleImageUpload(
      supabaseClient,
      files,
      pictureType,
      groupId
    );

    // store image UUIDs in event table
    const dbHandler = await createDBHandler("supabase", supabaseClient);

    await dbHandler.updateGroup(groupId, {
      photos: imageUUIDToStore,
    });
  } catch (error: unknown) {
    logger.error("Error uploading image", error);
  }
  if (groupId) redirect(`/group/${groupId}`);
}

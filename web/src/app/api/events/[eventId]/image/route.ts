import {
  createErrorResponse,
  createSuccessResponse,
} from "@/app/api/utils/response";
import { CREATE_PARAM } from "@/app/constants";
import { APIResponse, Picture, PictureType } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { Database as SupaDatabase } from "@/dataHandlers/supabase/database.types";
import { v4 as uuidv4 } from "uuid";
import { createStorageHandler } from "@/storage";

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ eventId: string }>;
  }
): Promise<NextResponse<APIResponse<{ pictures: Picture[] }>>> {
  const errorIdentifier = "Upload event picture";
  try {
    const eventId = (await params).eventId;
    if (eventId === CREATE_PARAM) {
      throw new Error("Invalid event ID");
    }

    const formData = await request.formData();
    // const pictureType = formData.get("pictureType") as PictureType;
    const pictureType = PictureType.EVENT_GALLERY;
    const files = formData.getAll("files") as File[];

    console.log("RESQUEST:", pictureType, files);

    if (pictureType === null || files === null) {
      throw new Error("Invalid input");
    }

    // TODO: validate body using zod

    // TODO: transform image to smaller size
    // files = await transformImage(files);

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

      pictures.push({
        id: entityId,
        type: pictureType,
        src: publicUrl,
        alt: "",
        createdAt: "",
      });
    }

    return createSuccessResponse(
      {
        pictures,
      },
      {
        status: 201,
      }
    );
  } catch (error: unknown) {
    return createErrorResponse(errorIdentifier, error);
  }
}

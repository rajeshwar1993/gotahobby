import { NextRequest, NextResponse } from "next/server";
import { APIResponse } from "@/types/apiTypes";
import { Tag } from "@/types";
import { CREATE_PARAM } from "@/app/constants";
import { createDBHandler } from "@/dataHandlers";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../../utils/response";
import { z } from "zod";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ tagId: string }>;
  }
): Promise<NextResponse<APIResponse<Tag>>> {
  const errorIdentifier = "Get Tag by ID";
  try {
    const tagId = (await params).tagId;
    if (tagId === CREATE_PARAM) {
      throw new Error("Invalid event ID");
    }

    // TODO: authenticate request

    // TODO: validate input params

    // fetch data from DB
    const dbHandler = await createDBHandler("supabase");
    await dbHandler.connect();
    const event = await dbHandler.getTagById(tagId);

    return createSuccessResponse(event);
  } catch (error: unknown) {
    return createErrorResponse(errorIdentifier, error);
  }
}

// Define the validation schema for event creation
const tagCreateSchema = z.object({
  value: z.string().min(2, "text is required"),
});

type EventCreateData = z.infer<typeof tagCreateSchema>;

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ tagId: string }>;
  }
): Promise<NextResponse<APIResponse<Tag>>> {
  const errorIdentifier = "Create event";

  try {
    const tagId = (await params).tagId;
    if (tagId !== CREATE_PARAM) {
      throw new Error("Invalid event ID");
    }

    // Parse and validate the request body
    const body = await request.json();
    const validatedData = tagCreateSchema.parse(body);

    // Initialize the database handler
    const dbHandler = await createDBHandler("supabase");
    await dbHandler.connect();

    // Create the event in the database
    const response = await dbHandler.createTag(validatedData.value);

    // Return the newly created event ID and basic info
    return createSuccessResponse(
      {
        id: response.id,
        value: response.value,
      },
      {
        status: 201,
      }
    );
  } catch (error: unknown) {
    return createErrorResponse(errorIdentifier, error);
  }
}

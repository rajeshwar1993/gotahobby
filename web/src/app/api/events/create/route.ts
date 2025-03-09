import { createDBHandler } from "@/dataHandlers";
import { APIResponse, NewEventResponse } from "@/types";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../../utils/response";

// Define the validation schema for event creation
const eventCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  groupId: z.string().uuid("Invalid group ID"),
});

type EventCreateData = z.infer<typeof eventCreateSchema>;

export async function POST(
  request: NextRequest
): Promise<NextResponse<APIResponse<NewEventResponse>>> {
  const errorIdentifier = "Create event";

  try {
    // Parse and validate the request body
    const body = await request.json();
    const validatedData = eventCreateSchema.parse(body);

    // Generate a new UUID for the event
    const eventId = crypto.randomUUID();

    // Initialize the database handler
    const dbHandler = await createDBHandler("supabase");
    await dbHandler.connect();

    // Create the event in the database
    const response = await dbHandler.createEvent(
      validatedData.title,
      validatedData.groupId
    );

    // Return the newly created event ID and basic info
    return createSuccessResponse(
      {
        id: response.id,
      },
      {
        status: 201,
      }
    );
  } catch (error: unknown) {
    return createErrorResponse(errorIdentifier, error);
  }
}

import { createDBHandler } from "@/dataHandlers";
import { NextRequest, NextResponse } from "next/server";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../../utils/response";
import { APIResponse, OKResponse } from "@/types/apiTypes";
import { Event, NewEventResponse } from "@/types";
import { event_ObjToDB } from "@/dataHandlers/supabase/transformers";
import { z } from "zod";

const CREATE_PARAM = "create";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ eventId: string }>;
  }
): Promise<NextResponse<APIResponse<Event>>> {
  const errorIdentifier = "GET event by ID";
  try {
    const eventId = (await params).eventId;
    if (eventId === CREATE_PARAM) {
      throw new Error("Invalid event ID");
    }

    // TODO: authenticate request

    // TODO: validate input params

    // fetch data from DB
    const dbHandler = await createDBHandler("supabase");
    await dbHandler.connect();
    const event = await dbHandler.getEventById(eventId);

    return createSuccessResponse(event);
  } catch (error: unknown) {
    return createErrorResponse(errorIdentifier, error);
  }
}

// Define the validation schema for event creation
const eventCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  groupId: z.string().uuid("Invalid group ID"),
});

type EventCreateData = z.infer<typeof eventCreateSchema>;

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ eventId: string }>;
  }
): Promise<NextResponse<APIResponse<NewEventResponse>>> {
  const errorIdentifier = "Create event";

  try {
    // Parse and validate the request body
    const body = await request.json();
    const validatedData = eventCreateSchema.parse(body);

    // Generate a new UUID for the event
    const eventId = crypto.randomUUID();
    if (eventId !== CREATE_PARAM) {
      throw new Error("Invalid event ID");
    }

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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
): Promise<NextResponse<OKResponse>> {
  const errorIdentifier = "Update event";
  try {
    const eventId = (await params).eventId;
    if (eventId === CREATE_PARAM) {
      throw new Error("Invalid event ID");
    }

    // TODO: authenticate request

    // TODO: validate input params using zod

    const body = await request.json();

    // create db handler
    const dbHandler = await createDBHandler("supabase");
    await dbHandler.connect();
    const data = event_ObjToDB(body);

    await dbHandler.updateEvent(eventId, data);

    return createSuccessResponse({
      operation: "OK",
    });
  } catch (error: unknown) {
    return createErrorResponse(errorIdentifier, error);
  }
}

export async function DELETE({
  params,
}: {
  params: Promise<{ eventId: string }>;
}): Promise<NextResponse<OKResponse>> {
  const errorIdentifier = "Update gropup";
  try {
    const eventId = (await params).eventId;
    if (eventId === CREATE_PARAM) {
      throw new Error("Invalid event ID");
    }

    // TODO: validate data

    // TODO: validate authorization

    // create gropup in DB
    const dbHandler = await createDBHandler("supabase");
    await dbHandler.deleteEvent(eventId);

    return createSuccessResponse({
      operation: "OK",
    });
  } catch (error: unknown) {
    return createErrorResponse(errorIdentifier, error);
  }
}

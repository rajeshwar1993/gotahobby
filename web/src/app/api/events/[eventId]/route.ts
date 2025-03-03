import { createDBHandler } from "@/dataHandlers";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../../utils/response";
import { APIResponse, OKResponse } from "@/types/apiTypes";
import { Event, NewEventResponse } from "@/types";

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

    // TODO: authenticate request

    // TODO: validate input params

    // fetch data from DB
    const dbHandler = await createDBHandler("supabase");
    await dbHandler.connect();
    const event = await dbHandler.getEventById(eventId);

    return createSuccessResponse(event);
  } catch (error: unknown) {
    console.log(error);
    if (isAxiosError(error)) {
      return createErrorResponse(errorIdentifier, error.code, error.message);
    }
    return createErrorResponse(errorIdentifier);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
): Promise<NextResponse<OKResponse>> {
  const errorIdentifier = "Update event";
}

export async function DELETE({
  params,
}: {
  params: Promise<{ eventId: string }>;
}): Promise<NextResponse<OKResponse>> {
  const errorIdentifier = "Update gropup";
  try {
    const eventId = (await params).eventId;

    // TODO: validate data

    // TODO: validate authorization

    // create gropup in DB
    const dbHandler = await createDBHandler("supabase");
    await dbHandler.deleteEvent(eventId);

    return createSuccessResponse({
      operation: "OK",
    });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return createErrorResponse(errorIdentifier, error.code, error.message);
    }
    return createErrorResponse(errorIdentifier);
  }
}

import { NextRequest, NextResponse } from "next/server";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../../utils/response";
import { APIResponse, OKResponse } from "@/types/apiTypes";
import { Group, NewGroupResponse } from "@/types/group";
import { createClient } from "@/utils/supabase/server";
import { Database as SupaDatabase } from "@/dataHandlers/supabase/database.types";
import { createDBHandler } from "@/dataHandlers";
import { CREATE_PARAM } from "@/app/constants";
import { z } from "zod";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ groupId: string }>;
  }
): Promise<NextResponse<APIResponse<Group>>> {
  const errorIdentifier = "GET group by ID";
  try {
    const groupId = (await params).groupId;
    if (groupId === CREATE_PARAM) {
      throw new Error("Invalid event ID");
    }

    // TODO: validate input params

    // fetch data from DB
    const supabaseClient = await createClient<SupaDatabase>();
    const dbHandler = await createDBHandler("supabase", supabaseClient);
    const group = await dbHandler.getGroupById(groupId);

    return createSuccessResponse(group);
  } catch (error: unknown) {
    return createErrorResponse(errorIdentifier, error);
  }
}

// Define the validation schema for event creation
const eventGroupSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ groupId: string }>;
  }
): Promise<NextResponse<APIResponse<NewGroupResponse>>> {
  const errorIdentifier = "Create new group";
  try {
    const groupId = (await params).groupId;
    if (groupId !== CREATE_PARAM) {
      throw new Error("Invalid event ID");
    }

    const body = await request.json();
    const validatedData = eventGroupSchema.parse(body);
    const groupTitle = validatedData.title;

    // TODO: find the authenticated user's uuid
    const createdBy = "aabd04f0-78e5-42b0-b254-e71b36578ed9";

    // create group in DB
    const supabaseClient = await createClient<SupaDatabase>();
    const dbHandler = await createDBHandler("supabase", supabaseClient);
    const response = await dbHandler.createGroup({
      title: groupTitle?.toString(),
      createdBy,
    });

    return createSuccessResponse(
      {
        id: response.id,
        name: groupTitle?.toString() || "",
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
  { params }: { params: Promise<{ groupId: string }> }
): Promise<NextResponse<OKResponse>> {
  const errorIdentifier = "Update group";
  try {
    const groupId = (await params).groupId;
    const formData = await request.formData();
    const id = formData.get("id");
    const groupName = formData.get("name");

    // TODO: validate data

    // TODO: validate authorization

    // create group in DB
    const dbHandler = DBHandler.get();
    const response = await dbHandler.updateGroup(id, groupName?.toString());

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
  params: Promise<{ groupId: string }>;
}): Promise<NextResponse<OKResponse>> {
  const errorIdentifier = "Update group";
  try {
    const groupId = (await params).groupId;

    // TODO: validate data

    // TODO: validate authorization

    // create group in DB
    const dbHandler = DBHandler.get();
    await dbHandler.deleteGroup(groupId);

    return createSuccessResponse({
      operation: "OK",
    });
  } catch (error: unknown) {
    return createErrorResponse(errorIdentifier, error);
  }
}

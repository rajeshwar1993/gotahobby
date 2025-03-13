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

export async function POST(
  request: NextRequest
): Promise<NextResponse<APIResponse<NewGroupResponse>>> {
  const errorIdentifier = "Create new group";
  try {
    const formData = await request.formData();
    const groupName = formData.get("name");
    const newGroupUUID = "1111-1111"; // TODO: create new group id

    // TODO: validate data

    // create group in DB
    const dbHandler = DBHandler.get();
    const response = await dbHandler.createGroup(
      newGroupUUID,
      groupName?.toString()
    );

    return createSuccessResponse(
      {
        id: newGroupUUID,
        name: groupName?.toString() || "",
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

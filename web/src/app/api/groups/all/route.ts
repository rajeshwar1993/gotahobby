import { DBHandler } from "@/dataHandlers";
import { APIResponse } from "@/types/apiTypes";
import { Group } from "@/types/group";
import { NextResponse } from "next/server";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../../utils/response";
import { isAxiosError } from "axios";

export async function GET(): Promise<NextResponse<APIResponse<Array<Group>>>> {
  const errorIdentifier = "GET all groups";
  try {
    const dbHandler = DBHandler.get();
    const group = await dbHandler.getAllGroups();
    return createSuccessResponse(group);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return createErrorResponse(errorIdentifier, error.code, error.message);
    }
    return createErrorResponse(errorIdentifier);
  }
}

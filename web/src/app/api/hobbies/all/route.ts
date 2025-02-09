import { DBHandler } from "@/dataHandlers";
import { APIResponse } from "@/types/apiTypes";
import { Hobby } from "@/types/hobby";
import { NextResponse } from "next/server";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../../utils/response";
import { isAxiosError } from "axios";

export async function GET(): Promise<NextResponse<APIResponse<Array<Hobby>>>> {
  const errorIdentifier = "GET all hobbies";
  try {
    const dbHandler = DBHandler.get();
    const hobby = await dbHandler.getAllHobbies();
    return createSuccessResponse(hobby);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return createErrorResponse(errorIdentifier, error.code, error.message);
    }
    return createErrorResponse(errorIdentifier);
  }
}

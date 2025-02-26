import { DBHandler } from "@/dataHandlers";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../../utils/response";
import { APIResponse, OKResponse } from "@/types/apiTypes";
import { Hobby, NewHobbyResponse } from "@/types/hobby";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ hobbyId: string }>;
  }
): Promise<NextResponse<APIResponse<Hobby>>> {
  const errorIdentifier = "GET hobby by ID";
  try {
    const hobbyId = (await params).hobbyId;
    console.log(hobbyId);

    // TODO: authenticate request

    // TODO: validate input params

    // fetch data from DB
    const dbHandler = DBHandler.get();
    const hobby = await dbHandler.getHobby(hobbyId);

    // TODO: validate response

    return createSuccessResponse(hobby);
  } catch (error: unknown) {
    console.log(error);
    if (isAxiosError(error)) {
      return createErrorResponse(errorIdentifier, error.code, error.message);
    }
    return createErrorResponse(errorIdentifier);
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<APIResponse<NewHobbyResponse>>> {
  const errorIdentifier = "Create new Hobby";
  try {
    const formData = await request.formData();
    const hobbyName = formData.get("name");
    const newHobbyUUID = "1111-1111"; // TODO: create new hobby id

    // TODO: validate data

    // create Hobby in DB
    const dbHandler = DBHandler.get();
    const response = await dbHandler.createHobby(
      newHobbyUUID,
      hobbyName?.toString()
    );

    return createSuccessResponse(
      {
        uuid: newHobbyUUID,
        name: hobbyName?.toString() || "",
      },
      {
        status: 201,
      }
    );
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return createErrorResponse(errorIdentifier, error.code, error.message);
    }
    return createErrorResponse(errorIdentifier);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ hobbyId: string }> }
): Promise<NextResponse<OKResponse>> {
  const errorIdentifier = "Update Hobby";
  try {
    const hobbyId = (await params).hobbyId;
    const formData = await request.formData();
    const uuid = formData.get("uuid");
    const hobbyName = formData.get("name");

    // TODO: validate data

    // TODO: validate authorization

    // create Hobby in DB
    const dbHandler = DBHandler.get();
    const response = await dbHandler.updateHobby(uuid, hobbyName?.toString());

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

export async function DELETE({
  params,
}: {
  params: Promise<{ hobbyId: string }>;
}): Promise<NextResponse<OKResponse>> {
  const errorIdentifier = "Update Hobby";
  try {
    const hobbyId = (await params).hobbyId;

    // TODO: validate data

    // TODO: validate authorization

    // create Hobby in DB
    const dbHandler = DBHandler.get();
    await dbHandler.deleteHobby(hobbyId);

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

import { DBHandler } from "@/dataHandlers";
import {
  Comment,
  FetchCommentsResponse,
  SaveCommentResponse,
} from "@/types/discussion";
import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse, createSuccessResponse } from "../utils/response";
import { isAxiosError } from "axios";
import { OKResponse } from "@/types";

// Get the comments in param array
export async function GET({
  params,
}: {
  params: Promise<{ commentIDs: Array<string> }>;
}): Promise<NextResponse<FetchCommentsResponse>> {
  const errorIdentifier = "Get Comments";
  try {
    const commentIds = (await params).commentIDs;
    // TODO: authenticate request

    // TODO: validate input params

    // fetch data from DB
    const dbHandler = DBHandler.get();
    const comments = await dbHandler.getComments(commentIds);

    // TODO: validate response

    // TODO: transform data

    return createSuccessResponse(comments);
  } catch (error: unknown) {
    return createErrorResponse(errorIdentifier, error);
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<SaveCommentResponse>> {
  const errorIdentifier = "Update Comments";
  try {
    // TODO: authenticate request
    // TODO: validate authorization

    const formData = await request.formData();
    formData.entries;
    const isParentComment = formData.get("isParentComment");
    const parentID = formData.get("parentID");
    const text = formData.get("text");
    // TODO: validate input params

    // save in DB
    const newCommentId = "1111"; // TODO: create new ID
    const newComment: Comment = {};
    const dbHandler = DBHandler.get();
    const response = await dbHandler.saveComments(newComment);

    return createSuccessResponse(newComment, { status: 201 });
  } catch (error: unknown) {
    return createErrorResponse(errorIdentifier, error);
  }
}

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ commentId: string }>;
  }
): Promise<NextResponse<OKResponse>> {
  const errorIdentifier = "Create New Comments";
  try {
    const commentId = (await params).commentId;
    // TODO: authenticate request

    // TODO: validate authorization

    const formData = await request.formData();
    formData.entries;
    const text = formData.get("text");
    // TODO: validate input params

    // save in DB
    const dbHandler = DBHandler.get();
    await dbHandler.updateComment(commentId, text);

    return createSuccessResponse({ operation: "OK" });
  } catch (error: unknown) {
    return createErrorResponse(errorIdentifier, error);
  }
}

export async function DELETE({
  params,
}: {
  params: Promise<{ commentId: string }>;
}): Promise<NextResponse<OKResponse>> {
  const errorIdentifier = "Create New Comments";
  try {
    const commentId = (await params).commentId;
    // TODO: authenticate request

    // TODO: validate authorization

    // save in DB
    const dbHandler = DBHandler.get();
    await dbHandler.deleteComment(commentId);

    return createSuccessResponse({ operation: "OK" });
  } catch (error: unknown) {
    return createErrorResponse(errorIdentifier, error);
  }
}

import {
  Comment,
  FetchCommentsResponse,
  SaveCommentResponse,
} from "@/types/discussion";
import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse, createSuccessResponse } from "../utils/response";
import { OKResponse } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { createDBHandler } from "@/dataHandlers";
import { Database as SupaDatabase } from "@/dataHandlers/supabase/database.types";
import { z } from "zod";

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
    const supabaseClient = await createClient<SupaDatabase>();
    const dbHandler = await createDBHandler("supabase", supabaseClient);
    const comments = await dbHandler.getComments(commentIds);

    // TODO: validate response

    // TODO: transform data

    return createSuccessResponse(comments);
  } catch (error: unknown) {
    return createErrorResponse(errorIdentifier, error);
  }
}

// Define the validation schema for event creation
const commentCreateSchema = z
  .object({
    commentData: z.object({
      text: z.string().min(1, "Text is required"),
    }),
    associatedToType: z.enum(["GROUP", "EVENT"]),
    associatedTo: z.string().uuid("Associated ID is invalid"),
    author: z.string().uuid(),
    isParentComment: z.boolean(),
    parentId: z.string().uuid().optional(),
  })
  .refine(
    (data) => {
      return data.isParentComment ? !data.parentId : data.parentId;
    },
    { message: "Parent ID is required for child comments", path: ["parentId"] }
  );

export async function POST(
  request: NextRequest
): Promise<NextResponse<SaveCommentResponse>> {
  const errorIdentifier = "Create Comment";
  try {
    // TODO: authenticate request
    // TODO: validate authorization

    const body = await request.json();
    // TODO: validate input params
    const validatedData = commentCreateSchema.parse(body);

    // save in DB
    const supabaseClient = await createClient<SupaDatabase>();
    const dbHandler = await createDBHandler("supabase", supabaseClient);
    const response = await dbHandler.createNewComment({
      commentData: validatedData.commentData,
      associatedTo: validatedData.associatedTo,
      associatedToType: validatedData.associatedToType,
      isParentComment: validatedData.isParentComment,
      parentId: validatedData.parentId || null,
      author: validatedData.author,
    });

    // Return the newly created comment ID and basic info
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

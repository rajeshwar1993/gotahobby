import { FetchCommentsResponse, SaveCommentResponse } from "@/types/discussion";
import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse, createSuccessResponse } from "../utils/response";
import { OKResponse } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { createDBHandler } from "@/dataHandlers";
import { Database as SupaDatabase } from "@/dataHandlers/supabase/database.types";
import { z } from "zod";

// Get the comments in param array
export async function GET(
  request: NextRequest
): Promise<NextResponse<FetchCommentsResponse>> {
  const errorIdentifier = "Get Comments";
  try {
    const commentIds = request.nextUrl.searchParams.getAll("ids");

    // validate input params
    const commentIdsSchema = z.array(z.string().uuid());
    const validatedData = commentIdsSchema.parse(commentIds);

    // fetch data from DB
    const supabaseClient = await createClient<SupaDatabase>();
    const dbHandler = await createDBHandler("supabase", supabaseClient);
    const comments = await dbHandler.getComemntsByIDs(validatedData);

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

export async function DELETE(
  request: NextRequest
): Promise<NextResponse<OKResponse>> {
  const errorIdentifier = "Create New Comments";
  try {
    const commentId = request.nextUrl.searchParams.get("id");

    // validate input params
    if (!commentId) {
      throw new Error("Comment ID is required");
    }

    // TODO: validate authorization

    // save in DB
    const supabaseClient = await createClient<SupaDatabase>();
    const dbHandler = await createDBHandler("supabase", supabaseClient);
    await dbHandler.deleteComment(commentId);

    return createSuccessResponse({ operation: "OK" });
  } catch (error: unknown) {
    return createErrorResponse(errorIdentifier, error);
  }
}

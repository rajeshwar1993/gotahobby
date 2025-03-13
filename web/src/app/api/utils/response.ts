import { APIResponse, CustomError } from "@/types/apiTypes";
import { PostgrestError } from "@supabase/supabase-js";
import { isAxiosError } from "axios";
import { NextResponse } from "next/server";
import { z } from "zod";

export const createSuccessResponse = <T>(
  data: T,
  options?: {
    status: number;
  }
): NextResponse<APIResponse<T>> => {
  return NextResponse.json(
    {
      isSuccess: true,
      data,
      error: null,
    },
    {
      ...options,
    }
  );
};

export const createErrorResponse = <T>(
  errorIdentifier: string = "Unknown Error identifier",
  error: unknown
): NextResponse<APIResponse<T>> => {
  let status = 500;
  let origin: string = "Unknown";
  let name: string | undefined = "Unknown Error name";
  let code: string | undefined = "Unknown Error code";
  let message: string | undefined = "Unknown Error occured";

  console.error(`Error: [${errorIdentifier}]:`, error);

  if (isAxiosError(error)) {
    origin = "Axios";
    name = error.name;
    code = error.code;
    message = error.message;
  } else if (error instanceof z.ZodError) {
    origin = "Zod";
    name = error.name;
    message = error.errors.map((e) => `${e.path}: ${e.message}`).join(", ");
  } else if (error instanceof PostgrestError) {
    // TODO : these errors are from supabase, we need to handle them properly
    origin = "DB";
    status = 400;
    name = error.name;
    code = error.code;
    message = error.message;
  } else if (error instanceof Error) {
    code = error.name;
    message = error.message;
  }

  const customError: CustomError = {
    errorIdentifier,
    message,
    code,
    name,
    origin,
  };

  return NextResponse.json(
    {
      isSuccess: false,
      data: null,
      error: customError,
    },
    { status }
  );
};

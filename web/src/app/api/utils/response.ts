import { APIResponse, CustomError } from "@/types/apiTypes";
import { NextResponse } from "next/server";

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
  code: string = "Unexpected Error code",
  message: string = "Unexpected Error occured"
): NextResponse<APIResponse<T>> => {
  const error: CustomError = {
    message: `Error: [${errorIdentifier}]: ${message}`,
    code,
  };

  return NextResponse.json({
    isSuccess: false,
    data: null,
    error,
  });
};

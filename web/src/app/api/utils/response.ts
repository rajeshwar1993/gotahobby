import { APIResponse, CustomError } from "@/types/apiTypes";
import { isAxiosError } from "axios";
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
  error: unknown
): NextResponse<APIResponse<T>> => {
  let name: string | undefined = "Unexpected Error name";
  let code: string | undefined = "Unexpected Error code";
  let message: string | undefined = "Unexpected Error occured";

  if (isAxiosError(error)) {
    name = error.name;
    code = error.code;
    message = error.message;
  } else if (error instanceof Error) {
    code = error.name;
    message = error.message;
  }

  const customError: CustomError = {
    message: `Error: [${errorIdentifier}]: ${message}`,
    code,
    name,
  };

  return NextResponse.json({
    isSuccess: false,
    data: null,
    error: customError,
  });
};

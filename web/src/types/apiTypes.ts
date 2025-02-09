export type OKResponse = APIResponse<{
  operation: "OK";
}>;

export type Result = {
  isSuccess: boolean;
};

export type CustomError = {
  message: string;
  code: string;
};

export type APISuccessResponse<T> = {
  isSuccess: true;
  data: T;
  error: null;
};

export type APIErrorResponse = {
  isSuccess: false;
  data: null;
  error: CustomError;
};

export type APIResponse<T> = APISuccessResponse<T> | APIErrorResponse;

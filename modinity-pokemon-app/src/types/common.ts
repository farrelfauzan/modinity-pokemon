export type BaseErrorResponse = {
  status: number;
  data?: {
    error: string;
    message: string;
    statusCode: number;
  };
};

export type BaseResponse<T> = {
  status: number;
  data: T;
};

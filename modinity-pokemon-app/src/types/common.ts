export type BaseErrorResponse = {
  status: number;
  data?: {
    error: string;
    message: string;
    statusCode: number;
  };
};

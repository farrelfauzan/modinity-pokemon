import { BaseErrorResponse } from "@/types/common";
import {
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import qs from "qs";
import { toast } from "sonner";

const baseQueryPokedex = fetchBaseQuery({
  baseUrl: "https://pokeapi.co/api/v2",
  paramsSerializer: (params) => qs.stringify(params),
  prepareHeaders: (headers) => {
    return headers;
  },
});

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_URL as string,
  paramsSerializer: (params) => qs.stringify(params),
  prepareHeaders: (headers) => {
    return headers;
  },
});

export const apiBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const { error, data } = await baseQuery(args, api, extraOptions);
  if (error) {
    const err: BaseErrorResponse = error as BaseErrorResponse;
    toast.error(err?.data?.message || "An error occurred");
    return { error };
  }

  return { data };
};

export const apiBaseQueryPokedex: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const { error, data } = await baseQueryPokedex(args, api, extraOptions);

  if (error) {
    const err: BaseErrorResponse = error as BaseErrorResponse;
    return { error: err };
  }

  return { data };
};

export const openApiBaseQuery = fetchBaseQuery();

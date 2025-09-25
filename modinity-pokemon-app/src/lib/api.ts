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

export const apiBaseQueryPokedex: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const { error, data } = await baseQueryPokedex(args, api, extraOptions);

  if (error) {
    const err: BaseErrorResponse = error as BaseErrorResponse;

    toast("Error", {
      description:
        JSON.stringify(err?.data?.message) || "Internal Server Error",
      action: {
        label: "Close",
        onClick: () => toast.dismiss(),
      },
    });

    return { error };
  }

  return { data };
};

export const openApiBaseQuery = fetchBaseQuery();

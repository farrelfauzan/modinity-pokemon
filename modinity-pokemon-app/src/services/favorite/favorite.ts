import { apiBaseQuery } from "@/lib/api";
import {
  CreateFavoriteDto,
  CreateFavoriteResponse,
  DeleteFavoriteDto,
  DeleteFavoriteResponse,
  FavoritesResponse,
  UpdateFavoriteDto,
  UpdateFavoriteResponse,
} from "@/types/favorite";
import { createApi } from "@reduxjs/toolkit/query/react";

const favoriteApi = createApi({
  reducerPath: "favoriteApi",
  tagTypes: ["Favorite"],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200,
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getFavorites: builder.query<FavoritesResponse, void>({
      query: () => "/favorite",
    }),
    createFavorite: builder.mutation<CreateFavoriteResponse, CreateFavoriteDto>(
      {
        query: (dto) => ({
          url: "/favorite",
          method: "POST",
          body: dto,
        }),
      }
    ),
    updateFavorite: builder.mutation<
      UpdateFavoriteResponse,
      UpdateFavoriteDto & { id: number }
    >({
      query: ({ id, ...dto }) => ({
        url: `/favorite/${id}`,
        method: "PUT",
        body: dto,
      }),
    }),
    deleteFavorite: builder.mutation<DeleteFavoriteResponse, DeleteFavoriteDto>(
      {
        query: (dto) => ({
          url: `/favorite/${dto.id}`,
          method: "DELETE",
        }),
      }
    ),
  }),
});

export const {
  useGetFavoritesQuery,
  useCreateFavoriteMutation,
  useUpdateFavoriteMutation,
  useDeleteFavoriteMutation,
  useLazyGetFavoritesQuery,
} = favoriteApi;

export default favoriteApi;

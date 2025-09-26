import { apiBaseQuery } from "@/lib/api";
import {
  CreateTeamDto,
  CreateTeamResponse,
  DeleteTeamDto,
  DeleteTeamResponse,
  TeamResponse,
  TeamsResponse,
  UpdateTeamDto,
  UpdateTeamResponse,
} from "@/types/team";
import { createApi } from "@reduxjs/toolkit/query/react";

const teamApi = createApi({
  reducerPath: "teamApi",
  tagTypes: ["Team"],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200,
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getTeams: builder.query<TeamsResponse, void>({
      query: () => "/team",
      providesTags: ["Team"],
    }),
    getTeamById: builder.query<TeamResponse, { id: number }>({
      query: ({ id }) => `/team/${id}`,
      providesTags: ["Team"],
    }),
    createTeam: builder.mutation<CreateTeamResponse, CreateTeamDto>({
      query: (dto) => ({
        url: "/team",
        method: "POST",
        body: dto,
      }),
      invalidatesTags: ["Team"],
    }),
    updateTeam: builder.mutation<
      UpdateTeamResponse,
      UpdateTeamDto & { id: number }
    >({
      query: ({ id, ...dto }) => ({
        url: `/team/${id}`,
        method: "PATCH",
        body: dto,
      }),
      invalidatesTags: ["Team"],
    }),
    removePokemonFromTeam: builder.mutation<
      TeamResponse,
      { id: number; pokemonName: string }
    >({
      query: ({ id, pokemonName }) => ({
        url: `/team/${id}/remove-pokemon`,
        method: "POST",
        body: { pokemonName },
      }),
      invalidatesTags: ["Team"],
    }),
    deleteTeam: builder.mutation<DeleteTeamResponse, DeleteTeamDto>({
      query: (dto) => ({
        url: `/team/${dto.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useGetTeamByIdQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useRemovePokemonFromTeamMutation,
  useDeleteTeamMutation,
  useLazyGetTeamsQuery,
  useLazyGetTeamByIdQuery,
} = teamApi;

export default teamApi;

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
      providesTags: (result, error, { id }) => [{ type: "Team", id }],
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
        method: "PUT",
        body: dto,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Team", id },
        "Team",
      ],
    }),
    deleteTeam: builder.mutation<DeleteTeamResponse, DeleteTeamDto>({
      query: (dto) => ({
        url: `/team/${dto.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Team", id },
        "Team",
      ],
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useGetTeamByIdQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useLazyGetTeamsQuery,
  useLazyGetTeamByIdQuery,
} = teamApi;

export default teamApi;

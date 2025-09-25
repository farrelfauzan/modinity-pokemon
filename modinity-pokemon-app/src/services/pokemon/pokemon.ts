import { apiBaseQueryPokedex } from "@/lib/api";
import {
  Pokemon,
  PokemonByTypeResponse,
  PokemonListResponse,
  PokemonRequestParams,
} from "@/types/pokemon";
import { createApi } from "@reduxjs/toolkit/query/react";

const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  tagTypes: ["Pokemon"],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200,
  baseQuery: apiBaseQueryPokedex,
  endpoints: (builder) => ({
    getPokemons: builder.query<PokemonListResponse, PokemonRequestParams>({
      query: (data) => ({
        url: "/pokemon",
        params: {
          offset: data.offset ?? 0,
          limit: data.limit ?? 20,
        },
      }),
    }),
    getPokemonById: builder.query<Pokemon, number>({
      query: (id) => ({
        url: `/pokemon/${id}`,
      }),
    }),
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => ({
        url: `/pokemon/${name}`,
      }),
    }),
    getPokemonsByType: builder.query<PokemonByTypeResponse, string>({
      query: (type) => ({
        url: `/type/${type}`,
      }),
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useGetPokemonByIdQuery,
  useGetPokemonByNameQuery,
  useGetPokemonsByTypeQuery,
  useLazyGetPokemonByIdQuery,
  useLazyGetPokemonByNameQuery,
  useLazyGetPokemonsQuery,
  useLazyGetPokemonsByTypeQuery,
} = pokemonApi;

export default pokemonApi;

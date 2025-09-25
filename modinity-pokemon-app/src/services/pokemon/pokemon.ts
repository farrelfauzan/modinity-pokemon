import { apiBaseQueryPokedex } from "@/lib/api";
import {
  Pokemon,
  PokemonListResponse,
  PokemonRequestParams,
} from "@/types/pokemon";
import { createApi } from "@reduxjs/toolkit/query/react";

const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  tagTypes: ["Pokemon"],
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
  }),
});

export const {
  useGetPokemonsQuery,
  useGetPokemonByIdQuery,
  useGetPokemonByNameQuery,
  useLazyGetPokemonByIdQuery,
  useLazyGetPokemonByNameQuery,
  useLazyGetPokemonsQuery,
} = pokemonApi;

export default pokemonApi;

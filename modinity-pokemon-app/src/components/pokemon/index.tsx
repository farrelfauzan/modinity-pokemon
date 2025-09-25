"use client";

import {
  useGetPokemonsQuery,
  useLazyGetPokemonByIdQuery,
  useLazyGetPokemonByNameQuery,
} from "@/services/pokemon/pokemon";
import { PokemonList } from "../pokemon-list/pokemon-list";
import { useEffect, useState } from "react";
import { extractPokemonId } from "@/utils/pokemon";
import { Pokemon as PokemonType } from "@/types/pokemon";
import { toast } from "sonner";

export function Pokemon() {
  const [allPokemon, setAllPokemons] = useState<PokemonType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchState, setSearchState] = useState<{
    searchTerm: string;
    searching: boolean;
    searchResult: PokemonType | null;
  }>({
    searchTerm: "",
    searching: false,
    searchResult: null,
  });
  const itemsPerPage = 20;

  const { data: pokemons } = useGetPokemonsQuery({
    offset: (currentPage - 1) * itemsPerPage,
    limit: itemsPerPage,
  });
  const [getPokemonById, { isLoading: loadingPokemonById }] =
    useLazyGetPokemonByIdQuery();
  const [getPokemonByName, { isLoading: loadingPokemonByName }] =
    useLazyGetPokemonByNameQuery();

  const getPokemonsByUrl = async (urls: string[]) => {
    const promises = urls.map(async (url) => {
      const id = extractPokemonId(url);
      const result = await getPokemonById(id).unwrap();
      return result;
    });
    return Promise.all(promises);
  };

  const loadPokemon = async () => {
    try {
      getPokemonsByUrl(pokemons?.results.map((p) => p.url) || []).then(
        (data) => {
          setAllPokemons(data);
        }
      );
      setTotalPages(Math.ceil((pokemons?.count ?? 0) / itemsPerPage));
    } catch (error) {
      console.error("Failed to load Pokémon details:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchState.searchTerm) {
      setSearchState((prev) => ({ ...prev, searchResult: null }));
      return;
    }

    try {
      setSearchState((prev) => ({ ...prev, searching: true }));
      const result = await getPokemonByName(searchState.searchTerm).unwrap();
      setSearchState((prev) => ({
        ...prev,
        searchResult: result,
        searching: false,
      }));
    } catch (error) {
      toast("Sorry, we couldn't find that Pokémon.", {
        action: { label: "Close", onClick: () => toast.dismiss() },
        style: {
          border: "1px solid",
          borderColor: "#bada55",
          backgroundColor: "oklch(0.92 0.03 85)",
          fontFamily: '"Courier New", monospace',
          fontWeight: "bold",
          textShadow: "1px 1px 0 oklch(0.25 0.08 120)",
        },
        cancelButtonStyle: {
          color: "#bada55",
          borderColor: "#bada55",
          fontFamily: '"Courier New", monospace',
          fontWeight: "bold",
          textShadow: "1px 1px 0 oklch(0.25 0.08 120)",
          backgroundColor: "oklch(0.1 0.03 85)",
        },
      });
      setSearchState((prev) => ({
        ...prev,
        searching: false,
        searchResult: null,
      }));
      setAllPokemons([]);
      setTotalPages(1);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    loadPokemon();
  }, [pokemons]);

  return (
    <PokemonList
      favorites={[]}
      team={[]}
      pokemon={allPokemon}
      onViewDetails={() => {}}
      onToggleFavorite={() => {}}
      onAddToTeam={() => {}}
      pagination={{
        currentPage,
        totalPages,
        onPageChange: setCurrentPage,
      }}
      search={{
        searchTerm: searchState.searchTerm,
        setSearchTerm: (term) =>
          setSearchState((prev) => ({ ...prev, searchTerm: term })),
        handleSearch: () => {
          handleSearch();
        },
        searching: searchState.searching,
        searchResult: searchState.searchResult,
        clearSearch: () =>
          setSearchState((prev) => ({
            ...prev,
            searchResult: null,
            searchTerm: "",
          })),
      }}
      loading={loadingPokemonById || loadingPokemonByName}
    />
  );
}

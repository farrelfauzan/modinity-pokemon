"use client";

import {
  useGetPokemonsQuery,
  useLazyGetPokemonByIdQuery,
  useLazyGetPokemonsByTypeQuery,
  useLazyGetPokemonsQuery,
} from "@/services/pokemon/pokemon";
import { PokemonList } from "../pokemon-list/pokemon-list";
import { useEffect, useState } from "react";
import { extractPokemonId } from "@/utils/pokemon";
import { Pokemon as PokemonType } from "@/types/pokemon";
import { toast } from "sonner";
import { PokemonTypeName } from "@/constants/pokemon-types";
import { useRouter } from "next/navigation";

export function Pokemon() {
  const router = useRouter();
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
  const [typeFilter, setTypeFilter] = useState<{
    selectedType: PokemonTypeName | null;
    onTypeChange: (type: PokemonTypeName | null) => void;
  }>({
    selectedType: null,
    onTypeChange: (type) => {
      // Reset to page 1 when user selects a new type
      setCurrentPage(1);
      setTypeFilter((prev) => ({ ...prev, selectedType: type }));
    },
  });
  const [typeFilteredPokemon, setTypeFilteredPokemon] = useState<PokemonType[]>(
    []
  );
  const [allFilteredResults, setAllFilteredResults] = useState<PokemonType[]>(
    []
  );

  const itemsPerPage = 8;

  const { data: pokemons, isFetching: loadingPokemons } = useGetPokemonsQuery({
    offset: (currentPage - 1) * itemsPerPage,
    limit: itemsPerPage,
  });
  const [getPokemonById, { isFetching: loadingPokemonById }] =
    useLazyGetPokemonByIdQuery();
  const [getPokemonsByType, { isFetching: loadingPokemonsByType }] =
    useLazyGetPokemonsByTypeQuery();
  const [getPokemons, { data: pokemonsData }] = useLazyGetPokemonsQuery();

  const getPokemonsByUrl = async (urls: string[]) => {
    const promises = urls.map(async (url) => {
      const id = extractPokemonId(url);
      const result = await getPokemonById(id).unwrap();
      return result;
    });
    return Promise.all(promises);
  };

  const paginateResults = (results: PokemonType[], page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return results.slice(startIndex, endIndex);
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

  const loadPokemonByType = async (type: string) => {
    try {
      const result = await getPokemonsByType(type).unwrap();

      if (result.pokemon && result.pokemon.length > 0) {
        let matches = pokemonsData?.results.filter((p) =>
          result.pokemon.some(
            (tp) => extractPokemonId(tp.pokemon.url) === extractPokemonId(p.url)
          )
        );

        // If searchTerm is present, filter matches by searchTerm as well
        if (searchState.searchTerm && matches && matches.length > 0) {
          const searchTerm = searchState.searchTerm.toLowerCase();
          matches = matches.filter((p) =>
            p.name.toLowerCase().includes(searchTerm)
          );
        }

        if (matches && matches.length > 0) {
          const urls = matches.map((m) => m.url);
          const detailed = await getPokemonsByUrl(urls);

          setAllFilteredResults(detailed);
          setTotalPages(Math.ceil(detailed.length / itemsPerPage));

          const paginatedResults = paginateResults(detailed, currentPage);
          setTypeFilteredPokemon(paginatedResults);
        } else {
          setAllFilteredResults([]);
          setTypeFilteredPokemon([]);
          setTotalPages(1);
          toast(
            searchState.searchTerm
              ? `No Pokémon found matching "${searchState.searchTerm}" in ${type} type.`
              : "No Pokémon found for this type."
          );
        }
      }
      setAllPokemons([]);
    } catch (error) {
      setTypeFilteredPokemon([]);
    }
  };

  const handleSearch = async () => {
    if (!searchState.searchTerm) {
      setSearchState((prev) => ({ ...prev, searchResult: null }));
      setAllFilteredResults([]);
      if (typeFilter.selectedType) {
        loadPokemonByType(typeFilter.selectedType);
      } else {
        loadPokemon();
      }
      return;
    }

    try {
      setSearchState((prev) => ({ ...prev, searching: true }));

      // Reset to page 1 when starting a new search
      setCurrentPage(1);

      if (typeFilter.selectedType) {
        await loadPokemonByType(typeFilter.selectedType);
      } else {
        if (pokemonsData?.results) {
          const searchTerm = searchState.searchTerm.toLowerCase();
          const matches = pokemonsData.results.filter((p) =>
            p.name.toLowerCase().includes(searchTerm)
          );

          if (matches.length > 0) {
            const urls = matches.map((m) => m.url);
            const detailed = await getPokemonsByUrl(urls);

            setAllFilteredResults(detailed);
            setTotalPages(Math.ceil(detailed.length / itemsPerPage));

            // Use page 1 since we just reset currentPage above
            const paginatedResults = paginateResults(detailed, 1);
            setAllPokemons(paginatedResults);
            setTypeFilteredPokemon([]);
          } else {
            setAllFilteredResults([]);
            setAllPokemons([]);
            setTotalPages(1);
            toast(`No Pokémon found matching "${searchState.searchTerm}".`);
          }
        }
      }

      setSearchState((prev) => ({ ...prev, searching: false }));
    } catch (error) {
      console.error("Search error:", error);
      setSearchState((prev) => ({
        ...prev,
        searching: false,
        searchResult: null,
      }));
      toast("An error occurred while searching.");
    }
  };

  useEffect(() => {
    if (typeFilter.selectedType) {
      loadPokemonByType(typeFilter.selectedType);
    } else {
      setTypeFilteredPokemon([]);
      if (!searchState.searchTerm && pokemons) {
        loadPokemon();
      }
    }
  }, [currentPage, typeFilter.selectedType, pokemons]);

  useEffect(() => {
    if (searchState.searchTerm && typeFilter.selectedType) {
      loadPokemonByType(typeFilter.selectedType);
    }
  }, [typeFilter.selectedType]);

  useEffect(() => {
    if (
      allFilteredResults.length > 0 &&
      (typeFilter.selectedType || searchState.searchTerm)
    ) {
      const paginatedResults = paginateResults(allFilteredResults, currentPage);

      if (typeFilter.selectedType) {
        setTypeFilteredPokemon(paginatedResults);
      } else {
        setAllPokemons(paginatedResults);
      }
    }
  }, [
    currentPage,
    allFilteredResults,
    typeFilter.selectedType,
    searchState.searchTerm,
  ]);

  useEffect(() => {
    getPokemons({ offset: 0, limit: 2000 });
  }, []);

  return (
    <PokemonList
      favorites={[]}
      team={[]}
      pokemon={allPokemon}
      onViewDetails={(pokemon) => {
        router.push(`/pokemon/${pokemon.id}`);
      }}
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
        clearSearch: () => {
          setSearchState((prev) => ({
            ...prev,
            searchResult: null,
            searchTerm: "",
          }));
          setAllFilteredResults([]);
          if (typeFilter.selectedType) {
            loadPokemonByType(typeFilter.selectedType);
          } else {
            loadPokemon();
          }
        },
      }}
      typeFilter={{
        selectedType: typeFilter.selectedType,
        onTypeChange: (type) => {
          setCurrentPage(1); // Reset to first page when changing filter
          setAllFilteredResults([]);
          setTypeFilter((prev) => ({ ...prev, selectedType: type }));
        },
      }}
      typeFilteredPokemon={typeFilteredPokemon}
      loadingType={loadingPokemonsByType}
      loading={loadingPokemonById || loadingPokemons}
    />
  );
}

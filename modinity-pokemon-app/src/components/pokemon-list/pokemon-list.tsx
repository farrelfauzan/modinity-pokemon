"use client";

import { Pokemon } from "@/types/pokemon";
import { SearchControls } from "../search-controls";
import { useState } from "react";

type IPokemonListProps = {
  onViewDetails: (pokemon: Pokemon) => void;
  favorites: Pokemon[];
  team: Pokemon[];
  onToggleFavorite: (pokemon: Pokemon) => void;
  onAddToTeam: (pokemon: Pokemon) => void;
};

export function PokemonList({
  onViewDetails,
  favorites,
  team,
  onToggleFavorite,
  onAddToTeam,
}: IPokemonListProps) {
  const [searchState, setSearchState] = useState<{
    searchTerm: string;
    searching: boolean;
    searchResult: { name: string; id: number } | null;
  }>({
    searchTerm: "",
    searching: false,
    searchResult: null,
  });

  return (
    <div className="space-y-6">
      <SearchControls
        searchTerm={searchState.searchTerm}
        setSearchTerm={(term) =>
          setSearchState((prev) => ({ ...prev, searchTerm: term }))
        }
        handleSearch={() => {}}
        searching={searchState.searching}
        handleKeyPress={() => {}}
        searchResult={searchState.searchResult}
        clearSearch={() => {}}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"></div>
    </div>
  );
}

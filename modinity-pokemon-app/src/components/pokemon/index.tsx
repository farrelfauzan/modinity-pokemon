"use client";

import { PokemonList } from "../pokemon-list/pokemon-list";

export function Pokemon() {
  return (
    <PokemonList
      favorites={[]}
      team={[]}
      onViewDetails={() => {}}
      onToggleFavorite={() => {}}
      onAddToTeam={() => {}}
    />
  );
}

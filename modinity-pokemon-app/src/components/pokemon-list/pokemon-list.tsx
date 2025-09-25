"use client";

import { Pokemon } from "@/types/pokemon";
import { SearchControls } from "../search-controls";
import { useState } from "react";
import { PokemonCard } from "../pokemon-card/pokemon-card";

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

  const [pokemon, setPokemon] = useState<Pokemon[]>([
    {
      id: 1,
      name: "Bulbasaur",
      types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        other: {
          "official-artwork": {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
          },
        },
      },
      abilities: [],
      stats: [],
      height: 7,
      weight: 69,
    },
    {
      id: 4,
      name: "Charmander",
      types: [{ type: { name: "fire" } }],
      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
        other: {
          "official-artwork": {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
          },
        },
      },
      abilities: [],
      stats: [],
      height: 6,
      weight: 85,
    },
    {
      id: 7,
      name: "Squirtle",
      types: [{ type: { name: "water" } }],
      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
        other: {
          "official-artwork": {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
          },
        },
      },
      abilities: [],
      stats: [],
      height: 5,
      weight: 90,
    },
  ]);

  const displayPokemon = searchState.searchResult
    ? pokemon.filter((p) => p.id === searchState.searchResult?.id)
    : pokemon;

  const isFavorite = (p: Pokemon) => favorites.some((fav) => fav.id === p.id);
  const isInTeam = (p: Pokemon) => team.some((member) => member.id === p.id);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayPokemon.map((p) => (
          <PokemonCard
            key={p.id}
            pokemon={p}
            onViewDetails={onViewDetails}
            onToggleFavorite={onToggleFavorite}
            onAddToTeam={onAddToTeam}
            isFavorite={isFavorite(p)}
            isInTeam={isInTeam(p)}
          />
        ))}
      </div>
    </div>
  );
}

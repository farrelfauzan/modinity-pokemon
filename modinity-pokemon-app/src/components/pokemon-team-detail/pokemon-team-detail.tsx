"use client";

import { useGetTeamByIdQuery } from "@/services/team/team";
import { PokemonSlot } from "../pokemon-slot/pokemon-slot";
import { useLazyGetPokemonByNameQuery } from "@/services/pokemon/pokemon";
import { useEffect, useState } from "react";
import { Pokemon } from "@/types/pokemon";

export function PokemonTeamDetail({ id }: { id: number }) {
  const [teamPokemon, setTeamPokemon] = useState<Pokemon[]>([]);

  const { data: team , isFetching: isFetchingTeam , isSuccess: isSuccessTeam } = useGetTeamByIdQuery({ id });
  const [getPokemonByName, { data: pokemonByName }] =
    useLazyGetPokemonByNameQuery();

  const loadPokemons = async () => {
    if (!team?.data?.pokemons) return;
    
    try {
      // Clear previous Pokemon data when loading new team
      setTeamPokemon([]);
      
      // Load all Pokemon details
      const pokemonPromises = team.data.pokemons.map(async (pokemon) => {
        const result = await getPokemonByName(pokemon).unwrap();
        return result;
      });
      
      const allPokemon = await Promise.all(pokemonPromises);
      setTeamPokemon(allPokemon);
    } catch (error) {
      console.error("Failed to fetch Pokemon details:", error);
    }
  };

  useEffect(() => {
    if (isSuccessTeam) {
      loadPokemons();
    }
  }, [isSuccessTeam, team?.data?.pokemons]);

  // Early return after all hooks
  if (!team?.data) {
    return (
      <div className="text-center text-neutral-500 pixel-font">
        Loading team details...
      </div>
    );
  }

  // Helper function to get stat value by name
  const getStatValue = (pokemon: Pokemon, statName: string): number => {
    const stat = pokemon.stats.find(s => s.stat.name === statName);
    return stat ? stat.base_stat : 0;
  };

  // Calculate average stats
  const averageStats = teamPokemon.length > 0 ? [
    {
      name: "hp",
      average: Math.round(teamPokemon.reduce((sum, p) => sum + getStatValue(p, "hp"), 0) / teamPokemon.length)
    },
    {
      name: "attack",
      average: Math.round(teamPokemon.reduce((sum, p) => sum + getStatValue(p, "attack"), 0) / teamPokemon.length)
    },
    {
      name: "defense", 
      average: Math.round(teamPokemon.reduce((sum, p) => sum + getStatValue(p, "defense"), 0) / teamPokemon.length)
    },
    {
      name: "special-attack",
      average: Math.round(teamPokemon.reduce((sum, p) => sum + getStatValue(p, "special-attack"), 0) / teamPokemon.length)
    },
    {
      name: "special-defense",
      average: Math.round(teamPokemon.reduce((sum, p) => sum + getStatValue(p, "special-defense"), 0) / teamPokemon.length)
    },
    {
      name: "speed",
      average: Math.round(teamPokemon.reduce((sum, p) => sum + getStatValue(p, "speed"), 0) / teamPokemon.length)
    }
  ] : [];

  // Calculate team stats (total stats)
  const teamStats = {
    hp: teamPokemon.reduce((sum, p) => sum + getStatValue(p, "hp"), 0),
    attack: teamPokemon.reduce((sum, p) => sum + getStatValue(p, "attack"), 0),
    defense: teamPokemon.reduce((sum, p) => sum + getStatValue(p, "defense"), 0),
    "special-attack": teamPokemon.reduce((sum, p) => sum + getStatValue(p, "special-attack"), 0),
    "special-defense": teamPokemon.reduce((sum, p) => sum + getStatValue(p, "special-defense"), 0),
    speed: teamPokemon.reduce((sum, p) => sum + getStatValue(p, "speed"), 0)
  };

  // Calculate type coverage
  const typeCoverage = teamPokemon.reduce((coverage, pokemon) => {
    pokemon.types.forEach(typeObj => {
      const typeName = typeObj.type.name;
      coverage[typeName] = (coverage[typeName] || 0) + 1;
    });
    return coverage;
  }, {} as { [key: string]: number });

  // Drag and drop handlers (placeholders for now)
  const handleDragStart = (index: number) => {
    console.log("Drag start:", index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    console.log("Drop at index:", index);
  };

  const handleRemoveFromTeam = (pokemon: Pokemon) => {
    console.log("Remove pokemon:", pokemon.name);
    // TODO: Implement remove functionality
  };

  return (
    <PokemonSlot 
      team={team.data} 
      teamPokemon={teamPokemon} 
      loading={isFetchingTeam}
      averageStats={averageStats}
      teamStats={teamStats}
      typeCoverage={typeCoverage}
      handleRemoveFromTeam={handleRemoveFromTeam}
    />
  );
}

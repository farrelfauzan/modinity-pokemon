"use client";

import {
  useGetTeamByIdQuery,
  useRemovePokemonFromTeamMutation,
  useUpdateTeamMutation,
} from "@/services/team/team";
import { PokemonSlot } from "../pokemon-slot/pokemon-slot";
import { useLazyGetPokemonByNameQuery } from "@/services/pokemon/pokemon";
import { useEffect, useState } from "react";
import { Pokemon } from "@/types/pokemon";
import { CreateTeamDialog } from "../create-team-dialog/create-team-dialog";

export function PokemonTeamDetail({ id }: { id: number }) {
  const [teamPokemon, setTeamPokemon] = useState<Pokemon[]>([]);
  const [open, setOpen] = useState(false);

  const {
    data: team,
    isFetching: isFetchingTeam,
    isSuccess: isSuccessTeam,
  } = useGetTeamByIdQuery({ id });
  const [getPokemonByName, { data: pokemonByName }] =
    useLazyGetPokemonByNameQuery();

  const [removePokemonFromTeam] = useRemovePokemonFromTeamMutation();

  const loadPokemons = async () => {
    if (!team?.data?.pokemons) return;

    try {
      setTeamPokemon([]);

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

  if (!team?.data) {
    return (
      <div className="text-center text-neutral-500 pixel-font">
        Loading team details...
      </div>
    );
  }

  const getStatValue = (pokemon: Pokemon, statName: string): number => {
    const stat = pokemon.stats.find((s) => s.stat.name === statName);
    return stat ? stat.base_stat : 0;
  };

  const averageStats =
    teamPokemon.length > 0
      ? [
          {
            name: "hp",
            average: Math.round(
              teamPokemon.reduce((sum, p) => sum + getStatValue(p, "hp"), 0) /
                teamPokemon.length
            ),
          },
          {
            name: "attack",
            average: Math.round(
              teamPokemon.reduce(
                (sum, p) => sum + getStatValue(p, "attack"),
                0
              ) / teamPokemon.length
            ),
          },
          {
            name: "defense",
            average: Math.round(
              teamPokemon.reduce(
                (sum, p) => sum + getStatValue(p, "defense"),
                0
              ) / teamPokemon.length
            ),
          },
          {
            name: "special-attack",
            average: Math.round(
              teamPokemon.reduce(
                (sum, p) => sum + getStatValue(p, "special-attack"),
                0
              ) / teamPokemon.length
            ),
          },
          {
            name: "special-defense",
            average: Math.round(
              teamPokemon.reduce(
                (sum, p) => sum + getStatValue(p, "special-defense"),
                0
              ) / teamPokemon.length
            ),
          },
          {
            name: "speed",
            average: Math.round(
              teamPokemon.reduce(
                (sum, p) => sum + getStatValue(p, "speed"),
                0
              ) / teamPokemon.length
            ),
          },
        ]
      : [];

  const teamStats = {
    hp: teamPokemon.reduce((sum, p) => sum + getStatValue(p, "hp"), 0),
    attack: teamPokemon.reduce((sum, p) => sum + getStatValue(p, "attack"), 0),
    defense: teamPokemon.reduce(
      (sum, p) => sum + getStatValue(p, "defense"),
      0
    ),
    "special-attack": teamPokemon.reduce(
      (sum, p) => sum + getStatValue(p, "special-attack"),
      0
    ),
    "special-defense": teamPokemon.reduce(
      (sum, p) => sum + getStatValue(p, "special-defense"),
      0
    ),
    speed: teamPokemon.reduce((sum, p) => sum + getStatValue(p, "speed"), 0),
  };

  const typeCoverage = teamPokemon.reduce((coverage, pokemon) => {
    pokemon.types.forEach((typeObj) => {
      const typeName = typeObj.type.name;
      coverage[typeName] = (coverage[typeName] || 0) + 1;
    });
    return coverage;
  }, {} as { [key: string]: number });

  const handleRemoveFromTeam = async (pokemon: Pokemon) => {
    const updatedPokemons = team.data.pokemons.filter(
      (p) => p !== pokemon.name
    );
    await removePokemonFromTeam({ id: team.data.id, pokemonName: pokemon.name })
  };

  const availableTeamPokemons = teamPokemon.map((p) => ({ name: p.name }));

  return (
    <div>
      <PokemonSlot
        team={team.data}
        teamPokemon={teamPokemon}
        loading={isFetchingTeam}
        averageStats={averageStats}
        teamStats={teamStats}
        typeCoverage={typeCoverage}
        handleRemoveFromTeam={handleRemoveFromTeam}
        addSlot={() => setOpen(true)}
      />
      <CreateTeamDialog
        open={open}
        setOpen={setOpen}
        onOpenChange={setOpen}
        availableTeamPokemons={availableTeamPokemons}
      />
    </div>
  );
}

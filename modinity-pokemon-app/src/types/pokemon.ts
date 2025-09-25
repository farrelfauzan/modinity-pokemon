export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
}

export interface PokemonByTypeResponse {
  damage_relations: {
    double_damage_from: Array<{ name: string; url: string }>;
    double_damage_to: Array<{ name: string; url: string }>;
    half_damage_from: Array<{ name: string; url: string }>;
    half_damage_to: Array<{ name: string; url: string }>;
    no_damage_from: Array<{ name: string; url: string }>;
    no_damage_to: Array<{ name: string; url: string }>;
  };
  game_indices: Array<{
    game_index: number;
    generation: { name: string; url: string };
  }>;
  generation: { name: string; url: string };
  id: number;
  move_damage_class: { name: string; url: string };
  moves: Array<{ name: string; url: string }>;
  name: string;
  names: Array<{
    language: { name: string; url: string };
    name: string;
  }>;
  past_damage_relations: any[];
  pokemon: Array<{
    pokemon: { name: string; url: string };
    slot: number;
  }>;
  sprites: Record<string, Record<string, { name_icon: string }>>;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface TypePokemonResponse {
  pokemon: Array<{
    pokemon: { name: string; url: string };
    slot: number;
  }>;
}

export type PokemonRequestParams = {
  offset?: number;
  limit?: number;
};

export function getTypeColor(type: string): string {
  const typeColors: Record<string, string> = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    psychic: "bg-pink-500",
    ice: "bg-cyan-500",
    dragon: "bg-purple-600",
    dark: "bg-gray-800",
    fairy: "bg-pink-300",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    bug: "bg-green-400",
    rock: "bg-yellow-800",
    ghost: "bg-purple-700",
    steel: "bg-gray-500",
    normal: "bg-gray-400",
  };
  return typeColors[type.toLowerCase()] || "bg-gray-400";
}

export const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

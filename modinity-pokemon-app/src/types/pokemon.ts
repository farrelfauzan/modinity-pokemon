// Pokemon API utilities and types
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
    pokemon: {
      name: string;
      url: string;
    };
  }>;
}

export type PokemonRequestParams = {
  offset?: number;
  limit?: number;
};

// const POKEMON_API_BASE = "https://pokeapi.co/api/v2";

// export async function fetchPokemonList(
//   offset = 0,
//   limit = 20
// ): Promise<PokemonListResponse> {
//   const response = await fetch(
//     `${POKEMON_API_BASE}/pokemon?offset=${offset}&limit=${limit}`
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch Pokemon list");
//   }
//   return response.json();
// }

// export async function fetchPokemon(
//   nameOrId: string | number
// ): Promise<Pokemon> {
//   const response = await fetch(`${POKEMON_API_BASE}/pokemon/${nameOrId}`);
//   if (!response.ok) {
//     throw new Error(`Failed to fetch Pokemon: ${nameOrId}`);
//   }
//   return response.json();
// }

// export async function searchPokemon(query: string): Promise<Pokemon | null> {
//   try {
//     return await fetchPokemon(query.toLowerCase());
//   } catch {
//     return null;
//   }
// }

// export async function fetchPokemonByType(type: string): Promise<Pokemon[]> {
//   try {
//     const response = await fetch(
//       `${POKEMON_API_BASE}/type/${type.toLowerCase()}`
//     );
//     if (!response.ok) {
//       throw new Error(`Failed to fetch Pokemon by type: ${type}`);
//     }

//     const data: TypePokemonResponse = await response.json();

//     // Get first 50 Pokemon of this type to avoid overwhelming the UI
//     const pokemonUrls = data.pokemon.slice(0, 50);

//     // Fetch detailed data for each Pokemon
//     const pokemonDetails = await Promise.all(
//       pokemonUrls.map(async (entry) => {
//         const id = getPokemonIdFromUrl(entry.pokemon.url);
//         // Only fetch Pokemon from the first 1000 (to avoid regional variants and special forms)
//         if (id <= 1000) {
//           try {
//             return await fetchPokemon(id);
//           } catch {
//             return null;
//           }
//         }
//         return null;
//       })
//     );

//     // Filter out null results and sort by ID
//     return pokemonDetails
//       .filter((pokemon): pokemon is Pokemon => pokemon !== null)
//       .sort((a, b) => a.id - b.id);
//   } catch (error) {
//     console.error(`Error fetching Pokemon by type ${type}:`, error);
//     return [];
//   }
// }

// export function getPokemonIdFromUrl(url: string): number {
//   const matches = url.match(/\/pokemon\/(\d+)\//);
//   return matches ? Number.parseInt(matches[1]) : 0;
// }

// export function formatPokemonName(name: string): string {
//   return name.charAt(0).toUpperCase() + name.slice(1);
// }

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

import { Pokemon } from "@/types/pokemon";
import { createBasicPokemon } from "@/utils/pokemon";

export async function getPokemonList(limit: number = 20): Promise<Pokemon[]> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.results.map((pokemon: { name: string; url: string }) =>
      createBasicPokemon(pokemon.name, pokemon.url)
    );
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    // Return fallback data
    return [
      createBasicPokemon("bulbasaur", "https://pokeapi.co/api/v2/pokemon/1/"),
      createBasicPokemon("charmander", "https://pokeapi.co/api/v2/pokemon/4/"),
      createBasicPokemon("squirtle", "https://pokeapi.co/api/v2/pokemon/7/"),
    ];
  }
}

/**
 * Extract Pokemon ID from PokeAPI URL
 * Example: "https://pokeapi.co/api/v2/pokemon/1/" -> 1
 */
export function extractPokemonId(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Generate Pokemon sprite URL from ID
 */
export function getPokemonSpriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

/**
 * Generate Pokemon official artwork URL from ID
 */
export function getPokemonArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

/**
 * Convert basic Pokemon data to full Pokemon object
 */
export function createBasicPokemon(name: string, url: string) {
  const id = extractPokemonId(url);

  return {
    id,
    name,
    types: [], // Will be filled when detailed data is needed
    sprites: {
      front_default: getPokemonSpriteUrl(id),
      other: {
        "official-artwork": {
          front_default: getPokemonArtworkUrl(id),
        },
      },
    },
    abilities: [],
    stats: [],
    height: 0,
    weight: 0,
  };
}

import { Favorite } from "@/components/favorite";
import { PokemonNavigation } from "@/components/navigation/pokemon-navigation";
import { Pokemon } from "@/components/pokemon";
import { PokemonTeam } from "@/components/pokemon-team";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="retro-border bg-card p-4 mb-6">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center pixel-font text-primary mb-2">
            POKEMON EXPLORER
          </h1>
          <p className="text-center text-muted-foreground pixel-font text-sm">
            Gotta Catch 'Em All! - Retro Edition
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-20">
        <PokemonNavigation
          pokemonContent={<Pokemon />}
          favoritesContent={<Favorite />}
          teamContent={<PokemonTeam />}
        />
      </div>
    </div>
  );
}

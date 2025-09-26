import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type PokemonTeamCardProps = {
  name: string;
  pokemons: string[];
};

export function PokemonTeamCard({ name, pokemons }: PokemonTeamCardProps) {
  return (
    <Card className="retro-border mb-4 hover:scale-[1.02] transition-transform hover:bg-muted/80">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="mt-2">
            {pokemons.length} Pokémon{pokemons.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

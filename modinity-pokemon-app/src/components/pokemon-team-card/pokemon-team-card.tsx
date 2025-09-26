import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type PokemonTeamCardProps = {
    id: number;
  name: string;
  pokemons: string[];
};

export function PokemonTeamCard({ id, name, pokemons }: PokemonTeamCardProps) {
  return (
    <Link href={`/team/${id}`} className="w-full">
      <Card className="retro-border mb-4 hover:scale-[1.02] transition-transform hover:bg-muted/80">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription className="mt-2">
            {pokemons.length} Pokémon{pokemons.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

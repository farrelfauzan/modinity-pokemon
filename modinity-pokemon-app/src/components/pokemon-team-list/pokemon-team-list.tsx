import { Team } from "@/types/team";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { PokemonTeamCard } from "../pokemon-team-card/pokemon-team-card";

type PokemonTeamListProps = {
  team: Team[];
  onClickCreate?: () => void;
};

export function PokemonTeamList({ team, onClickCreate }: PokemonTeamListProps) {
  return (
    <Card className="retro-border cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-between w-full">
          <CardTitle className="pixel-font text-primary">Team List</CardTitle>
          <Button variant="default" size="sm" onClick={onClickCreate}>
            + Create New Team
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {team.length === 0 && (
          <p className="text-center text-muted-foreground pixel-font py-8">
            No teams yet! Create your first Pokemon team.
          </p>
        )}
        {team.map((t) => (
          <PokemonTeamCard
            key={t.id}
            id={t.id}
            name={t.name}
            pokemons={t.pokemons}
          />
        ))}
      </CardContent>
    </Card>
  );
}

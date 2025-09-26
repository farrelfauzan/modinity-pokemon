import { PokemonSlot } from "@/components/pokemon-slot/pokemon-slot";
import { PokemonTeamDetail } from "@/components/pokemon-team-detail/pokemon-team-detail";
import { PokemonTeamHeader } from "@/components/pokemon-team-header/pokemon-team-header";

export default function TeamDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background pb-20">
      <PokemonTeamHeader id={Number(params.id)} /> 
      <PokemonTeamDetail id={Number(params.id)} />
    </div>
  );
}

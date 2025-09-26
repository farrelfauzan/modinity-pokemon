import { PokemonTeamDetail } from "@/components/pokemon-team-detail/pokemon-team-detail";
import { PokemonTeamHeader } from "@/components/pokemon-team-header/pokemon-team-header";

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background pb-20">
      <PokemonTeamHeader id={Number(id)} />
      <PokemonTeamDetail id={Number(id)} />
    </div>
  );
}

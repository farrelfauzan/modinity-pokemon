"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useGetTeamByIdQuery } from "@/services/team/team";
import { useRouter } from "next/navigation";

type IPokemonTeamHeaderProps = {
  id: number;
};

export function PokemonTeamHeader({ id }: IPokemonTeamHeaderProps) {
  const router = useRouter();
  const { data: team } = useGetTeamByIdQuery({ id });

  return (
    <header className="retro-border bg-card p-4 mb-6">
      <div className="container mx-auto flex items-center gap-4">
        <Button variant="outline" className="retro-border pixel-font" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold pixel-font text-primary mb-2 text-center">
            {team?.data.name || "Team Name"}
          </h1>
        </div>
      </div>
    </header>
  );
}

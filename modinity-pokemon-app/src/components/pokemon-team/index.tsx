"use client";

import { useGetTeamsQuery } from "@/services/team/team";
import { PokemonTeamList } from "../pokemon-team-list/pokemon-team-list";
import React, { useState } from "react";
import { CreateTeamDialog } from "../create-team-dialog/create-team-dialog";

export function PokemonTeam() {
  const [open, setOpen] = useState(false);

  const { data: teams } = useGetTeamsQuery();

  return (
    <div>
      <PokemonTeamList
        team={teams ? teams.data : []}
        onClickCreate={() => setOpen(true)}
      />
      <CreateTeamDialog open={open} onOpenChange={setOpen} setOpen={setOpen} />
    </div>
  );
}

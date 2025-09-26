"use client";

import { useState } from "react";
import { TeamMultiSelect } from "../team-multi-select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  useGetTeamByIdQuery,
  useUpdateTeamMutation,
} from "@/services/team/team";
import { Pokemon } from "@/types/pokemon";
import { toast } from "sonner";

type AddToTeamDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setOpen: (open: boolean) => void;
  selectedPokemonForTeam?: Pokemon | null;
};

export function AddToTeamDialog({
  open,
  onOpenChange,
  setOpen,
  selectedPokemonForTeam,
}: AddToTeamDialogProps) {
  const [selectedTeamIds, setSelectedTeamIds] = useState<number[]>([]);

  const [updateTeam] = useUpdateTeamMutation();

  const handleClose = () => {
    setOpen(false);
    setSelectedTeamIds([]);
    onOpenChange(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPokemonForTeam) {
      console.error("No Pokemon selected to add to team.");
      return;
    }
    try {
      await updateTeam({
        id: selectedTeamIds[0],
        pokemons: [
          selectedPokemonForTeam.name,
        ],
      }).unwrap();
      toast.success("Pokemon added to team successfully!");
    } catch (error) {
      console.error("Failed to add Pokemon to team:", error);
    }
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Pokemon to Team</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-3">
            <Label>Select Team</Label>
            <TeamMultiSelect
              value={selectedTeamIds}
              onChange={setSelectedTeamIds}
              placeholder="Select teams to add the Pokemon..."
              maxSelections={1}
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={selectedTeamIds.length === 0}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={selectedTeamIds.length === 0}>
              Add to Team
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

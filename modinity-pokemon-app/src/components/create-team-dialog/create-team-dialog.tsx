"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  useCreateTeamMutation,
  useUpdateTeamMutation,
} from "@/services/team/team";
import { useState } from "react";
import { toast } from "sonner";
import { PokemonMultiSelect } from "../pokemon-multi-select/pokemon-multi-select";
import { usePathname } from "next/navigation";

type CreateTeamDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setOpen: (open: boolean) => void;
  availableTeamPokemons?: { name: string }[];
};

export function CreateTeamDialog({
  open,
  onOpenChange,
  setOpen,
  availableTeamPokemons,
}: CreateTeamDialogProps) {
  const pathName = usePathname();
  const [teamName, setTeamName] = useState("");
  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);
  console.log("Available Team Pokemons:", selectedPokemons);
  const [createTeam, { isLoading }] = useCreateTeamMutation();
  const [updateTeam] = useUpdateTeamMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamName.trim() && pathName === "/") {
      toast.error("Please enter a team name");
      return;
    }

    if (selectedPokemons.length === 0) {
      toast.error("Please select at least one Pokemon");
      return;
    }

    try {
      if (pathName !== "/") {
        await updateTeam({
          id: Number(pathName.split("/").pop()),
          pokemons: selectedPokemons
        }).unwrap();
        toast.success("Pokemons added to team successfully!");
        setSelectedPokemons([]);
        setOpen(false);
        return;
      }

      await createTeam({
        name: teamName.trim(),
        pokemons: selectedPokemons,
      }).unwrap();

      toast.success("Team created successfully!");

      // Reset form
      setTeamName("");
      setSelectedPokemons([]);
      setOpen(false);
    } catch (error : any) {
      console.error("Error creating team:", error);
    }
  };

  const handleClose = () => {
    setTeamName("");
    setSelectedPokemons([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {pathName === "/" ? "Create New Team" : "Add Pokemons to Team"}
          </DialogTitle>
          <DialogDescription className="text-xs text-neutral-500">
            {pathName === "/"
              ? "Fill in the details below to create your new Pokemon team."
              : "Select up to 6 Pokemons to add to your team."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-3">
            {pathName === "/" && (
              <>
                <Label htmlFor="team-name">Team Name</Label>
                <Input
                  id="team-name"
                  name="name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name..."
                  required
                />
              </>
            )}
          </div>
          <div className="grid gap-3">
            <Label>Pokemon Selection</Label>
            <PokemonMultiSelect
              value={selectedPokemons}
              onChange={setSelectedPokemons}
              placeholder="Select up to 6 Pokemon for your team..."
              maxSelections={6}
              availableTeamPokemons={availableTeamPokemons}
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                pathName === "/" ?
                isLoading || !teamName.trim() || selectedPokemons.length === 0  : isLoading || selectedPokemons.length === 0
              }
            >
              {isLoading
                ? "Creating..."
                : pathName === "/"
                ? "Create Team"
                : "Add Pokemons"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

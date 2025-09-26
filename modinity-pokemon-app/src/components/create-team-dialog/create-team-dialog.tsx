"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useCreateTeamMutation } from "@/services/team/team";
import { useState } from "react";
import { toast } from "sonner";
import { PokemonMultiSelect } from "../pokemon-multi-select/pokemon-multi-select";

type CreateTeamDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setOpen: (open: boolean) => void;
};

export function CreateTeamDialog({
  open,
  onOpenChange,
  setOpen,
}: CreateTeamDialogProps) {
  const [teamName, setTeamName] = useState("");
  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);
  const [createTeam, { isLoading }] = useCreateTeamMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!teamName.trim()) {
      toast.error("Please enter a team name");
      return;
    }
    
    if (selectedPokemons.length === 0) {
      toast.error("Please select at least one Pokemon");
      return;
    }

    try {
      await createTeam({
        name: teamName.trim(),
        pokemons: selectedPokemons,
      }).unwrap();
      
      toast.success("Team created successfully!");
      
      // Reset form
      setTeamName("");
      setSelectedPokemons([]);
      setOpen(false);
    } catch (error) {
      toast.error("Failed to create team. Please try again.");
      console.error("Error creating team:", error);
    }
  };

  const handleClose = () => {
    setTeamName("");
    setSelectedPokemons([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose} >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
          <DialogDescription className="text-xs text-neutral-500">
            Fill in the details below to create your new Pokemon team.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="team-name">Team Name</Label>
            <Input
              id="team-name"
              name="name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name..."
              required
            />
          </div>
          <div className="grid gap-3">
            <Label>Pokemon Selection</Label>
            <PokemonMultiSelect
              value={selectedPokemons}
              onChange={setSelectedPokemons}
              placeholder="Select up to 6 Pokemon for your team..."
              maxSelections={6}
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
              disabled={isLoading || !teamName.trim() || selectedPokemons.length === 0}
            >
              {isLoading ? "Creating..." : "Create Team"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

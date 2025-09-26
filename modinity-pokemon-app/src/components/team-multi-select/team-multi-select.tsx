"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useGetTeamsQuery } from "@/services/team/team";
import { formatPokemonName } from "@/lib/utils";
import { useState } from "react";

interface TeamOption {
  id: number;
  name: string;
  pokemons: string[];
}

interface TeamMultiSelectProps {
  value: number[];
  onChange: (value: number[]) => void;
  placeholder?: string;
  maxSelections?: number;
}

export function TeamMultiSelect({
  value,
  onChange,
  placeholder = "Select Teams...",
  maxSelections = 10,
}: TeamMultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch teams data
  const { data: teamsData, isLoading } = useGetTeamsQuery();

  const availableTeams = teamsData?.data || [];

  // Filter teams based on search query
  const filteredTeams = availableTeams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (teamId: number) => {
    if (value.includes(teamId)) {
      // Remove if already selected
      onChange(value.filter((id) => id !== teamId));
    } else if (value.length < maxSelections) {
      // Add if not at max limit
      onChange([...value, teamId]);
    }
  };

  const handleRemove = (teamId: number) => {
    onChange(value.filter((id) => id !== teamId));
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const getTeamById = (id: number) => {
    return availableTeams.find(team => team.id === id);
  };

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between min-h-10"
          >
            <div className="flex flex-wrap gap-1 flex-1">
              {value.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                <span className="text-sm text-muted-foreground">
                  {value.length} / {maxSelections} teams selected
                </span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search teams..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>
                {isLoading ? "Loading teams..." : "No teams found."}
              </CommandEmpty>
              <CommandGroup>
                {filteredTeams.slice(0, 50).map((team) => (
                  <CommandItem
                    key={team.id}
                    value={team.name}
                    onSelect={() => handleSelect(team.id)}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center flex-1">
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value.includes(team.id)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col">
                        <span>{team.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {team.pokemons.length} Pokemon
                        </span>
                      </div>
                    </div>
                    {value.length >= maxSelections && !value.includes(team.id) && (
                      <span className="text-xs text-muted-foreground">Max reached</span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected Teams Display */}
      {value.length > 0 && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Selected Team:</span>
            {value.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="h-auto p-1 text-xs"
              >
                Clear all
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            {value.map((teamId) => {
              const team = getTeamById(teamId);
              if (!team) return null;
              
              return (
                <Badge
                  key={teamId}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  <span>{team.name}</span>
                  <span className="text-xs opacity-70">({team.pokemons.length})</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => handleRemove(teamId)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

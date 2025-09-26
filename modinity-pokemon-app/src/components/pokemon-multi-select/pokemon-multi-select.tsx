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
import { useGetPokemonsQuery } from "@/services/pokemon/pokemon";
import { formatPokemonName } from "@/lib/utils";
import { useState, useEffect } from "react";

interface PokemonOption {
  name: string;
  url: string;
}

interface PokemonMultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  maxSelections?: number;
}

export function PokemonMultiSelect({
  value,
  onChange,
  placeholder = "Select Pokemon...",
  maxSelections = 6,
}: PokemonMultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch Pokemon data
  const { data: pokemonData, isLoading } = useGetPokemonsQuery({
    limit: 1000, // Get a large list for selection
    offset: 0,
  });

  const availablePokemons = pokemonData?.results || [];

  // Filter Pokemon based on search query
  const filteredPokemons = availablePokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (pokemonName: string) => {
    if (value.includes(pokemonName)) {
      // Remove if already selected
      onChange(value.filter((item) => item !== pokemonName));
    } else if (value.length < maxSelections) {
      // Add if not at max limit
      onChange([...value, pokemonName]);
    }
  };

  const handleRemove = (pokemonName: string) => {
    onChange(value.filter((item) => item !== pokemonName));
  };

  const handleClearAll = () => {
    onChange([]);
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
                  {value.length} / {maxSelections} Pokemon selected
                </span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search Pokemon..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>
                {isLoading ? "Loading Pokemon..." : "No Pokemon found."}
              </CommandEmpty>
              <CommandGroup>
                {filteredPokemons.slice(0, 50).map((pokemon) => (
                  <CommandItem
                    key={pokemon.name}
                    value={pokemon.name}
                    onSelect={() => handleSelect(pokemon.name)}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value.includes(pokemon.name)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {formatPokemonName(pokemon.name)}
                    </div>
                    {value.length >= maxSelections && !value.includes(pokemon.name) && (
                      <span className="text-xs text-muted-foreground">Max reached</span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected Pokemon Display */}
      {value.length > 0 && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Selected Pokemon:</span>
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
            {value.map((pokemonName) => (
              <Badge
                key={pokemonName}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {formatPokemonName(pokemonName)}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => handleRemove(pokemonName)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
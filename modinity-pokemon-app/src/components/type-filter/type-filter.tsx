"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import {
  POKEMON_TYPES,
  PokemonTypeName,
  POKEMON_TYPE_COLORS,
} from "@/constants/pokemon-types";

interface TypeFilterProps {
  selectedType: PokemonTypeName | null;
  onTypeChange: (type: PokemonTypeName | null) => void;
}

export function TypeFilter({ selectedType, onTypeChange }: TypeFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTypeSelect = (type: PokemonTypeName) => {
    if (selectedType === type) {
      onTypeChange(null); // Deselect if already selected
    } else {
      onTypeChange(type); // Select new type
    }
  };

  const handleClear = () => {
    onTypeChange(null);
  };

  return (
    <div className="w-full max-w-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between retro-border pixel-font"
          >
            <span>Filter by Type {selectedType && `(${selectedType})`}</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-2">
          <Card className="retro-border">
            <CardHeader className="pb-3">
              <CardTitle className="pixel-font text-sm">
                Pokemon Types
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClear}
                  className="pixel-font text-xs"
                  disabled={!selectedType}
                >
                  Clear
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Selected type display */}
              {selectedType && (
                <div className="space-y-2">
                  <p className="text-xs pixel-font text-muted-foreground">
                    Selected Type:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge
                      variant="secondary"
                      className="pixel-font text-xs capitalize cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      style={{
                        backgroundColor:
                          POKEMON_TYPE_COLORS[selectedType] + "20",
                        borderColor: POKEMON_TYPE_COLORS[selectedType],
                        color: POKEMON_TYPE_COLORS[selectedType],
                      }}
                      onClick={() => handleClear()}
                    >
                      {selectedType}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  </div>
                </div>
              )}

              {/* Type radio buttons */}
              <RadioGroup
                value={selectedType || ""}
                onValueChange={(value) =>
                  handleTypeSelect(value as PokemonTypeName)
                }
              >
                <div className="grid grid-cols-2 gap-2">
                  {POKEMON_TYPES.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type} id={type} />
                      <label
                        htmlFor={type}
                        className="text-xs pixel-font capitalize cursor-pointer select-none"
                        style={{ color: POKEMON_TYPE_COLORS[type] }}
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

"use client";

import { Loader2, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type ISearchControlsProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  searchResult: { name: string; id: number } | null;
  clearSearch: () => void;
  searching: boolean;
  selectedType?: string | null;
  typeFilteredPokemon?: any[];
  loadingType?: boolean;
  allPokemon?: any[];
};

export function SearchControls({
  searchTerm,
  setSearchTerm,
  handleSearch,
  searching,
  handleKeyPress,
  searchResult,
  clearSearch,
  selectedType,
  typeFilteredPokemon,
  loadingType,
  allPokemon,
}: ISearchControlsProps) {
  return (
    <Card className="retro-border">
      <CardHeader>
        <CardTitle className="pixel-font text-primary">
          Search Pokemon
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 retro-border pixel-font"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleSearch}
              disabled={searching}
              className="retro-border pixel-font bg-primary hover:bg-primary/90"
            >
              {searching ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              Search
            </Button>
            {searchTerm && (
              <Button
                onClick={clearSearch}
                variant="outline"
                className="retro-border pixel-font bg-transparent"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {searchResult && (
          <p className="text-sm text-muted-foreground pixel-font">
            Found: {searchResult.name} (#{searchResult.id})
          </p>
        )}
      </CardContent>
    </Card>
  );
}

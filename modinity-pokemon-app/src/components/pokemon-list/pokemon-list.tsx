"use client";

import { Pokemon } from "@/types/pokemon";
import { SearchControls } from "../search-controls";
import { PokemonCard } from "../pokemon-card/pokemon-card";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { TypeFilter } from "../type-filter/type-filter";
import { PokemonTypeName } from "@/constants/pokemon-types";

type IPokemonListProps = {
  pokemon: Pokemon[];
  onViewDetails: (pokemon: Pokemon) => void;
  favorites: Pokemon[];
  team: Pokemon[];
  onToggleFavorite: (pokemon: Pokemon) => void;
  onAddToTeam: (pokemon: Pokemon) => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  search: {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleSearch: () => void;
    searchResult?: Pokemon | null;
    searching?: boolean;
    clearSearch?: () => void;
  };
  typeFilter?: {
    selectedType: PokemonTypeName | null;
    onTypeChange: (type: PokemonTypeName | null) => void;
  };
  loading?: boolean;
  typeFilteredPokemon?: Pokemon[];
  loadingType?: boolean;
};

export function PokemonList({
  pokemon,
  onViewDetails,
  favorites,
  team,
  onToggleFavorite,
  onAddToTeam,
  pagination,
  search,
  typeFilter,
  loading = false,
  typeFilteredPokemon,
  loadingType = false,
}: IPokemonListProps) {
  const isFavorite = (p: Pokemon) => favorites.some((fav) => fav.id === p.id);
  const isInTeam = (p: Pokemon) => team.some((member) => member.id === p.id);

  const displayPokemon = search.searchResult
    ? [search.searchResult]
    : typeFilteredPokemon && typeFilteredPokemon.length > 0
    ? typeFilteredPokemon
    : pokemon;

  return (
    <div className="space-y-6">
      <SearchControls
        searchTerm={search.searchTerm}
        setSearchTerm={(term) => search.setSearchTerm(term)}
        handleSearch={() => {
          search.handleSearch();
        }}
        searching={search.searching ?? false}
        handleKeyPress={(e) => {
          if (e.key === "Enter") {
            search.handleSearch();
          }
        }}
        searchResult={search.searchResult || null}
        clearSearch={() => {
          search.clearSearch && search.clearSearch();
        }}
        loadingType={loadingType}
        selectedType={typeFilter?.selectedType}
        typeFilteredPokemon={typeFilteredPokemon}
        allPokemon={pokemon}
      />

      {!search.searchResult && (
        <div className="flex items-start justify-between gap-4 mt-8">
          {typeFilter && (
            <TypeFilter
              selectedType={typeFilter.selectedType}
              onTypeChange={typeFilter.onTypeChange}
            />
          )}

          {/* Pagination */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="retro-border pixel-font bg-transparent"
              onClick={() =>
                pagination?.onPageChange(
                  Math.max(1, pagination.currentPage - 1)
                )
              }
              disabled={pagination?.currentPage === 1}
            >
              Previous
            </Button>

            {Array.from(
              { length: Math.min(5, pagination?.totalPages ?? 0) },
              (_, i) => {
                const pageNum =
                  Math.max(1, (pagination?.currentPage ?? 1) - 2) + i;
                if (pageNum > (pagination?.totalPages ?? 0)) return null;

                return (
                  <Button
                    key={pageNum}
                    variant={
                      pagination?.currentPage === pageNum
                        ? "default"
                        : "outline"
                    }
                    className="retro-border pixel-font"
                    onClick={() => pagination?.onPageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              }
            )}

            <Button
              variant="outline"
              className="retro-border pixel-font bg-transparent"
              onClick={() =>
                pagination?.onPageChange(
                  Math.min(pagination?.totalPages, pagination?.currentPage + 1)
                )
              }
              disabled={pagination?.currentPage === pagination?.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 pixel-font">Loading Pokemon...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayPokemon.map((p) => (
            <PokemonCard
              key={p.id}
              pokemon={p}
              onViewDetails={onViewDetails}
              onToggleFavorite={onToggleFavorite}
              onAddToTeam={onAddToTeam}
              isFavorite={isFavorite(p)}
              isInTeam={isInTeam(p)}
            />
          ))}
        </div>
      )}

      {displayPokemon.length === 0 && !search.searching && (
        <div className="text-center py-12">
          <p className="pixel-font text-muted-foreground">
            {search.searchResult === null && search.searchTerm
              ? "No Pokemon found for your search."
              : "No Pokemon to display."}
          </p>
        </div>
      )}
    </div>
  );
}

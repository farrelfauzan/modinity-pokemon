"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Eye, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTypeColor, Pokemon } from "@/types/pokemon";
import { formatPokemonName } from "@/lib/utils";
import { useState } from "react";

type IPokemonCardProps = {
  pokemon: Pokemon;
  onViewDetails: (pokemon: Pokemon) => void;
  onToggleFavorite: (pokemon: Pokemon) => void;
  onAddToTeam: (pokemon: Pokemon) => void;
  isFavorite: boolean;
  isInTeam: boolean;
};

export function PokemonCard({
  pokemon,
  onViewDetails,
  onToggleFavorite,
  onAddToTeam,
  isFavorite,
  isInTeam,
}: IPokemonCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card
      className="retro-border hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={() => onViewDetails(pokemon)}
    >
      <CardHeader className="text-center pb-2">
        <div className="w-24 h-24 mx-auto bg-secondary rounded-lg flex items-center justify-center retro-border overflow-hidden">
          {!imageError ? (
            <Image
              src={
                pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default ||
                "/placeholder.png"
              }
              alt={formatPokemonName(pokemon.name)}
              width={80}
              height={80}
              className="object-contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-2xl">❓</span>
          )}
        </div>
        <CardTitle className="pixel-font text-lg">
          #{pokemon.id.toString().padStart(3, "0")}
        </CardTitle>
        <p className="pixel-font text-sm font-bold">
          {formatPokemonName(pokemon.name)}
        </p>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="flex flex-wrap gap-1 justify-center">
          {pokemon.types.map((type) => (
            <Badge
              key={type.type.name}
              className={`pixel-font text-xs text-white ${getTypeColor(
                type.type.name
              )}`}
            >
              {formatPokemonName(type.type.name)}
            </Badge>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-1 text-xs">
          <Button
            size="sm"
            variant={isFavorite ? "default" : "outline"}
            className="pixel-font p-1"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(pokemon);
            }}
          >
            <Heart className={`w-3 h-3 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
          <Button
            size="sm"
            variant={isInTeam ? "default" : "outline"}
            className="pixel-font p-1"
            onClick={(e) => {
              e.stopPropagation();
              onAddToTeam(pokemon);
            }}
            disabled={isInTeam}
          >
            <Plus className="w-3 h-3" />
            <Users className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

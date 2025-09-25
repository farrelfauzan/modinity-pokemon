"use client";

import { useGetPokemonByIdQuery } from "@/services/pokemon/pokemon";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, Heart, Users } from "lucide-react";
import { formatPokemonName } from "@/lib/utils";
import { getTypeColor } from "@/types/pokemon";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "../ui/badge";

export function PokemonDetail() {
  const params = useParams();
  const router = useRouter();

  const [imageError, setImageError] = useState(false);

  const { data: pokemon, isLoading } = useGetPokemonByIdQuery(
    Number(params.id)
  );

  const mainStats = pokemon?.stats
    ? pokemon.stats.filter((stat) =>
        [
          "hp",
          "attack",
          "defense",
          "special-attack",
          "special-defense",
          "speed",
        ].includes(stat.stat.name)
      )
    : [];

  const getStatColor = (statName: string) => {
    const colors: Record<string, string> = {
      hp: "bg-green-500",
      attack: "bg-red-500",
      defense: "bg-blue-500",
      "special-attack": "bg-purple-500",
      "special-defense": "bg-yellow-500",
      speed: "bg-pink-500",
    };
    return colors[statName] || "bg-gray-500";
  };

  const formatStatName = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="pixel-font text-primary">Loading Pokemon...</p>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="retro-border">
          <CardContent className="text-center p-8">
            <p className="pixel-font text-lg mb-4">Pokemon not found!</p>
            <Button
              onClick={() => router.push("/")}
              className="retro-border pixel-font"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to List
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="retro-border bg-card p-4 mb-6">
        <div className="container mx-auto flex items-center gap-4">
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="retro-border pixel-font"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold pixel-font text-primary">
              #{pokemon.id.toString().padStart(3, "0")}{" "}
              {formatPokemonName(pokemon.name)}
            </h1>
            <p className="text-muted-foreground pixel-font text-sm">
              Pokemon Details
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image and Basic Info */}
          <div className="space-y-6">
            {/* Pokemon Image */}
            <Card className="retro-border">
              <CardContent className="flex justify-center items-center p-8">
                <div className="w-64 h-64 bg-secondary rounded-lg flex items-center justify-center retro-border">
                  {!imageError ? (
                    <Image
                      src={
                        pokemon.sprites.other["official-artwork"]
                          .front_default || pokemon.sprites.front_default
                      }
                      alt={formatPokemonName(pokemon.name)}
                      width={240}
                      height={240}
                      className="object-contain"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <span className="text-8xl">❓</span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Basic Info */}
            <Card className="retro-border">
              <CardHeader>
                <CardTitle className="pixel-font text-primary">
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="pixel-font text-sm text-muted-foreground">
                      Height
                    </span>
                    <p className="pixel-font font-bold text-lg">
                      {(pokemon.height / 10).toFixed(1)} m
                    </p>
                  </div>
                  <div>
                    <span className="pixel-font text-sm text-muted-foreground">
                      Weight
                    </span>
                    <p className="pixel-font font-bold text-lg">
                      {(pokemon.weight / 10).toFixed(1)} kg
                    </p>
                  </div>
                </div>

                <div>
                  <span className="pixel-font text-sm text-muted-foreground">
                    Types
                  </span>
                  <div className="flex gap-3 mt-2">
                    {pokemon.types.map((type) => (
                      <Badge
                        key={type.type.name}
                        className={`pixel-font text-white text-sm px-4 py-2 ${getTypeColor(
                          type.type.name
                        )}`}
                      >
                        {formatPokemonName(type.type.name)}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="pixel-font text-sm text-muted-foreground">
                    Abilities
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {pokemon.abilities.map((ability) => (
                      <Badge
                        key={ability.ability.name}
                        variant="outline"
                        className="pixel-font"
                      >
                        {formatPokemonName(ability.ability.name)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button className="flex-1 retro-border pixel-font bg-accent hover:bg-accent/90">
                <Heart className="w-4 h-4 mr-2" />
                Add to Favorites
              </Button>
              <Button
                variant="outline"
                className="flex-1 retro-border pixel-font bg-transparent"
              >
                <Users className="w-4 h-4 mr-2" />
                Add to Team
              </Button>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            <Card className="retro-border">
              <CardHeader>
                <CardTitle className="pixel-font text-primary">
                  Base Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {mainStats.map((stat) => {
                  const maxStat = 255; // Pokemon max base stat
                  const percentage = (stat.base_stat / maxStat) * 100;

                  return (
                    <div key={stat.stat.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="pixel-font font-bold">
                          {formatStatName(stat.stat.name)}
                        </span>
                        <span className="pixel-font font-bold text-primary">
                          {stat.base_stat}
                        </span>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-muted rounded-full h-4 retro-border">
                          <div
                            className={`h-4 rounded-full ${getStatColor(
                              stat.stat.name
                            )} transition-all duration-1000 ease-out`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Total Stats */}
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="pixel-font font-bold text-primary text-lg">
                      Total Base Stats
                    </span>
                    <span className="pixel-font font-bold text-primary text-lg">
                      {pokemon.stats.reduce(
                        (sum, stat) => sum + stat.base_stat,
                        0
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visual Stats Chart */}
            <Card className="retro-border">
              <CardHeader>
                <CardTitle className="pixel-font text-primary">
                  Stat Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 h-48">
                  {mainStats.map((stat) => {
                    const height = (stat.base_stat / 255) * 100;
                    return (
                      <div
                        key={stat.stat.name}
                        className="flex flex-col items-center justify-end"
                      >
                        <div className="text-center mb-2">
                          <div className="pixel-font text-xs font-bold">
                            {stat.base_stat}
                          </div>
                        </div>
                        <div
                          className={`w-8 ${getStatColor(
                            stat.stat.name
                          )} rounded-t transition-all duration-1000 ease-out`}
                          style={{ height: `${height}%` }}
                        />
                        <span className="pixel-font text-xs mt-2 text-center">
                          {formatStatName(stat.stat.name)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

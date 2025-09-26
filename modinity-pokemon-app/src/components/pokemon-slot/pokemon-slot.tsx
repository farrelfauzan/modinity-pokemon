"use client";

import { Plus, Trash2, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { formatPokemonName, formatStatName } from "@/lib/utils";
import { Progress } from "../ui/progress";
import { Team } from "@/types/team";
import { Badge } from "../ui/badge";
import { getTypeColor, Pokemon } from "@/types/pokemon";
import Image from "next/image";
import { useState } from "react";

type IPokemonSlotProps = {
  team: Team;
  teamPokemon: Pokemon[];
  loading: boolean;
  averageStats: { name: string; average: number }[];
  teamStats: { [key: string]: number };
  typeCoverage: { [key: string]: number };
  handleRemoveFromTeam: (pokemon: any) => void;
  addSlot: () => void;
};

export function PokemonSlot({
  team,
  teamPokemon,
  loading,
  averageStats,
  teamStats,
  typeCoverage,
  handleRemoveFromTeam,
  addSlot
}: IPokemonSlotProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 md:p-6 lg:p-8">
      <Card className="retro-border">
        <CardHeader>
          <CardTitle className="pixel-font text-primary flex items-center gap-2">
            <Users className="w-5 h-5" />
            {team.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Team Slots */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-6">
                {Array.from({ length: 6 }, (_, index) => {
                  const pokemon = teamPokemon[index];
                  return (
                    <div
                      key={index}
                      className={`aspect-square border-2 border-dashed border-muted rounded-lg flex flex-col items-center justify-center retro-border p-1 sm:p-2 md:p-3 transition-all gap-1 sm:gap-2 ${
                        pokemon ? "bg-card hover:shadow-md" : ""
                      }`}
                    >
                      {pokemon ? (
                        <>
                          {!imageError ? (
                            <Image
                              src={
                                pokemon.sprites.other["official-artwork"]
                                  .front_default ||
                                pokemon.sprites.front_default
                              }
                              alt={pokemon.name}
                              width={48}
                              height={48}
                              className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain mb-1"
                              onError={() => setImageError(true)}
                            />
                          ) : (
                            <span className="text-lg sm:text-xl md:text-2xl">❓</span>
                          )}

                          <span className="pixel-font text-[8px] sm:text-xs md:text-sm lg:text-base text-center font-bold leading-tight">
                            #{pokemon.id.toString().padStart(3, "0")}
                          </span>
                          <span className="pixel-font text-[7px] sm:text-[8px] md:text-xs lg:text-sm text-center leading-tight truncate w-full px-1">
                            {formatPokemonName(pokemon.name)}
                          </span>
                          <div className="flex gap-0.5 mt-0.5">
                            {pokemon.types.map((type) => (
                              <div
                                key={type.type.name}
                                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full ${getTypeColor(
                                  type.type.name
                                )}`}
                                title={formatPokemonName(type.type.name)}
                              />
                            ))}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="pixel-font text-[6px] sm:text-[7px] md:text-[8px] mt-1 bg-transparent p-0.5 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFromTeam(pokemon);
                            }}
                          >
                            <Trash2 className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <span className="text-muted-foreground pixel-font text-xs sm:text-sm md:text-base">
                            Slot {index + 1}
                          </span>
                          <Button 
                            variant="outline" 
                            className="p-1 sm:p-1.5 md:p-2 rounded-full cursor-pointer h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" 
                            onClick={(e) => {
                              e.stopPropagation();
                              addSlot();
                            }}
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-muted-foreground" />
                          </Button>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="text-center text-muted-foreground pixel-font text-sm">
                {teamPokemon.length === 0
                  ? "Build your dream team of up to 6 Pokemon!"
                  : "Click the trash icon to remove Pokemon from your team"}
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Team Analysis */}
      {teamPokemon.length > 0 && (
        <>
          {/* Team Stats */}
          <Card className="retro-border">
            <CardHeader>
              <CardTitle className="pixel-font text-primary flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Team Stats Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {averageStats
                .filter((stat) =>
                  [
                    "hp",
                    "attack",
                    "defense",
                    "special-attack",
                    "special-defense",
                    "speed",
                  ].includes(stat.name)
                )
                .map((stat) => {
                  const maxAverage = 150; // Reasonable max for average stats
                  const percentage = (stat.average / maxAverage) * 100;

                  return (
                    <div key={stat.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="pixel-font text-sm font-bold">
                          {formatStatName(stat.name)}
                        </span>
                        <div className="text-right">
                          <span className="pixel-font text-sm font-bold text-primary">
                            {stat.average}
                          </span>
                          <span className="pixel-font text-xs text-muted-foreground ml-2">
                            avg
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <Progress
                          value={percentage}
                          className="h-2 retro-border"
                        />
                      </div>
                    </div>
                  );
                })}

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="pixel-font font-bold text-primary">
                    Total Team Power
                  </span>
                  <span className="pixel-font font-bold text-primary text-lg">
                    {Object.values(teamStats).reduce(
                      (sum, stat) => sum + stat,
                      0
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Type Coverage */}
          <Card className="retro-border">
            <CardHeader>
              <CardTitle className="pixel-font text-primary">
                Type Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Object.entries(typeCoverage).map(([type, count]) => (
                  <Badge
                    key={type}
                    className={`pixel-font text-white ${getTypeColor(type)}`}
                  >
                    {formatPokemonName(type)} ({count})
                  </Badge>
                ))}
              </div>
              {Object.keys(typeCoverage).length === 0 && (
                <p className="text-center text-muted-foreground pixel-font py-4">
                  No types in your team yet!
                </p>
              )}
            </CardContent>
          </Card>

          {/* Team Recommendations */}
          <Card className="retro-border">
            <CardHeader>
              <CardTitle className="pixel-font text-primary">
                Team Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamPokemon.length < 6 && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="pixel-font">
                      Add {6 - teamPokemon.length} more Pokemon to complete your
                      team
                    </span>
                  </div>
                )}

                {Object.keys(typeCoverage).length < 3 &&
                  teamPokemon.length > 2 && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="pixel-font">
                        Consider adding more type diversity for better coverage
                      </span>
                    </div>
                  )}

                {averageStats.find((stat) => stat.name === "hp")?.average &&
                  averageStats.find((stat) => stat.name === "hp")!.average <
                    60 && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="pixel-font">
                        Your team could use more HP - consider bulkier Pokemon
                      </span>
                    </div>
                  )}

                {averageStats.find((stat) => stat.name === "speed")?.average &&
                  averageStats.find((stat) => stat.name === "speed")!.average >
                    100 && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="pixel-font">
                        Great speed! Your team should move first in battles
                      </span>
                    </div>
                  )}

                {Object.keys(typeCoverage).length >= 5 && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className="pixel-font">
                      Excellent type diversity! Your team is well-balanced
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

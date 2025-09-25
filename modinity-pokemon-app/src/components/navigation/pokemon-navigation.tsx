"use client";

import { Heart, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useGetFavoritesQuery } from "@/services/favorite/favorite";

type IPokemonNavigationProps = {
  pokemonContent: React.ReactNode;
  favoritesContent?: React.ReactNode;
  teamContent?: React.ReactNode;
};

export function PokemonNavigation({
  pokemonContent,
  favoritesContent,
  teamContent,
}: IPokemonNavigationProps) {
  const { data: favorites } = useGetFavoritesQuery();

  return (
    <Tabs defaultValue="pokemon" className="w-full">
      <TabsList className="grid w-full grid-cols-3 retro-border bg-card">
        <TabsTrigger value="pokemon">Pokemon</TabsTrigger>
        <TabsTrigger value="favorites" className="pixel-font">
          <Heart className="w-4 h-4 mr-1" />
          Favorites ({favorites?.data.length || 0})
        </TabsTrigger>
        <TabsTrigger value="team" className="pixel-font">
          <Users className="w-4 h-4 mr-1" />
          My Team (0)
        </TabsTrigger>
      </TabsList>
      <TabsContent value="pokemon" className="mt-4">
        {pokemonContent}
      </TabsContent>
      {favoritesContent && (
        <TabsContent value="favorites" className="mt-4">
          {favoritesContent}
        </TabsContent>
      )}
      {teamContent && (
        <TabsContent value="team" className="mt-4">
          {teamContent}
        </TabsContent>
      )}
    </Tabs>
  );
}

"use client";

import { Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  useDeleteFavoriteMutation,
  useGetFavoritesQuery,
} from "@/services/favorite/favorite";
import { useLazyGetPokemonByNameQuery } from "@/services/pokemon/pokemon";
import { useEffect, useState } from "react";
import { Pokemon } from "@/types/pokemon";
import { toast } from "sonner";

type FavoritePokemon = Pokemon & { favId: number };

export function Favorite() {
  const [favoritePokemon, setFavoritePokemon] = useState<FavoritePokemon[]>([]);
  const { data: favorites, refetch } = useGetFavoritesQuery();

  const [getPokemonByName] = useLazyGetPokemonByNameQuery();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const getPokemonDetails = async (name: string, favId: number) => {
    try {
      setFavoritePokemon((prev) => {
        if (prev.some((p) => p.name === name)) return prev;
        getPokemonByName(name)
          .unwrap()
          .then((result) => {
            setFavoritePokemon((current) => {
              if (current.some((p) => p.name === name)) return current;
              return [...current, { ...result, favId }];
            });
          })
          .catch((error) => {
            console.error("Failed to fetch Pokemon details:", error);
          });
        return prev;
      });
    } catch (error) {
      console.error("Failed to fetch Pokemon details:", error);
    }
  };

  const handleUnfavorite = async (pokemon: FavoritePokemon) => {
    try {
      await deleteFavorite({ id: pokemon.favId }).unwrap();
      setFavoritePokemon((prev) =>
        prev.filter((p) => p.favId !== pokemon.favId)
      );
      refetch();
      toast(`${pokemon.name} removed from favorites!`);
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  useEffect(() => {
    if (favorites && favorites.data.length > 0) {
      setFavoritePokemon([]);
      favorites.data.forEach((fav) => {
        getPokemonDetails(fav.pokemonName, fav.id);
      });
    }
  }, [favorites]);

  return (
    <Card className="retro-border">
      <CardHeader>
        <CardTitle className="pixel-font text-primary flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Your Favorite Pokemon ({favorites?.data.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {favorites?.data.length === 0 ? (
          <p className="text-center text-muted-foreground pixel-font py-8">
            No favorites yet! Start exploring and add Pokemon to your favorites.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoritePokemon.map((pokemon, index) => (
              <Card key={index + 1} className="retro-border">
                <CardHeader className="text-center pb-2">
                  <div className="w-20 h-20 mx-auto bg-secondary rounded-lg flex items-center justify-center retro-border">
                    <img
                      src={
                        pokemon.sprites.other["official-artwork"]
                          .front_default || pokemon.sprites.front_default
                      }
                      alt={pokemon.name}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <CardTitle className="pixel-font text-sm">
                    #{pokemon.id.toString().padStart(3, "0")} {pokemon.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full pixel-font bg-transparent"
                    onClick={() => handleUnfavorite(pokemon)}
                  >
                    Remove from Favorites
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

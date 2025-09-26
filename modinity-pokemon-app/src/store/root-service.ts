import { ConfigureStoreOptions, Middleware } from "@reduxjs/toolkit";

import pokemonApi from "@/services/pokemon/pokemon";
import favoriteApi from "@/services/favorite/favorite";
import teamApi from "@/services/team/team";
interface RootService {
  reducer: ConfigureStoreOptions["reducer"];
  middlewares: Middleware[];
}

const rootService: RootService = {
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [favoriteApi.reducerPath]: favoriteApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
  },
  middlewares: [
    pokemonApi.middleware,
    favoriteApi.middleware,
    teamApi.middleware,
  ],
};

export default rootService;

import { ConfigureStoreOptions, Middleware } from "@reduxjs/toolkit";

import pokemonApi from "@/services/pokemon/pokemon";
import favoriteApi from "@/services/favorite/favorite";
interface RootService {
  reducer: ConfigureStoreOptions["reducer"];
  middlewares: Middleware[];
}

const rootService: RootService = {
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [favoriteApi.reducerPath]: favoriteApi.reducer,
  },
  middlewares: [pokemonApi.middleware, favoriteApi.middleware],
};

export default rootService;

import pokemonApi from "@/services/pokemon/pokemon";
import { ConfigureStoreOptions, Middleware } from "@reduxjs/toolkit";

interface RootService {
  reducer: ConfigureStoreOptions["reducer"];
  middlewares: Middleware[];
}

const rootService: RootService = {
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middlewares: [pokemonApi.middleware],
};

export default rootService;

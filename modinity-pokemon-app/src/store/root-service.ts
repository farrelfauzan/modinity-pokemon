import { ConfigureStoreOptions } from "@reduxjs/toolkit";

interface RootService {
  reducer: ConfigureStoreOptions["reducer"];
  middlewares: ConfigureStoreOptions["middleware"];
}

const rootService: RootService = {
  reducer: {},
  middlewares: [],
};

export default rootService;

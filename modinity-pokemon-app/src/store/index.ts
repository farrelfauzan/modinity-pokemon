import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootService from "./root-service";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["layout", "me"],
};

const rootReducer = combineReducers({
  ...rootService.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (middlewares) =>
    middlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(rootService.middlewares),
});

const persistor = persistStore(store);

export { persistor, store };
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

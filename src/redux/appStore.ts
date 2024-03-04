import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import editorReducer from "./slice/editorSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Persistor, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  user: userReducer,
  editor: editorReducer
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor: Persistor = persistStore(store);

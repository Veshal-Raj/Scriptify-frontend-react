import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import editorReducer from "./slice/editorSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Persistor, persistStore } from "redux-persist";
import searchSlice from "./slice/searchSlice";
import chatSlice from "./slice/chatSlice";

const rootReducer = combineReducers({
  user: userReducer,
  editor: editorReducer,
  search: searchSlice,
  chat: chatSlice
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor: Persistor = persistStore(store);

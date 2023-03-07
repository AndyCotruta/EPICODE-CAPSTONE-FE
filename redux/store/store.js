import { configureStore, combineReducers } from "@reduxjs/toolkit";
import localStorage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import basketReducer from "../reducers/basketSlice";
import restaurantReducer from "../reducers/restaurantSlice";
import userReducer from "../reducers/userSlice";

const persistConfig = {
  key: "root",
  storage: localStorage,
};

const bigReducer = combineReducers({
  basket: basketReducer,
  restaurant: restaurantReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, bigReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

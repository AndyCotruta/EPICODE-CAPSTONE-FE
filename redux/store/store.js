import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import basketReducer from "../reducers/basketSlice";
import restaurantReducer from "../reducers/restaurantSlice";
import userReducer from "../reducers/userSlice";
import allRestaurantsReducer from "../reducers/allRestaurantsSlice";
import recipeReducer from "../reducers/recipeSlice";
import communicationReducer from "../reducers/communicationSlice";
import sharedOrderReducer from "../reducers/sharedOrderSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const bigReducer = combineReducers({
  basket: basketReducer,
  restaurant: restaurantReducer,
  user: userReducer,
  allRestaurants: allRestaurantsReducer,
  recipe: recipeReducer,
  communication: communicationReducer,
  sharedOrder: sharedOrderReducer,
});

const persistedReducer = persistReducer(persistConfig, bigReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

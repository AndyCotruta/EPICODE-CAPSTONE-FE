import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurantId: null,
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addRestautantId: (state, action) => {
      state.restaurantId = action.payload;
    },
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let newBasket = [...state.items];
      if (index !== -1) {
        newBasket.splice(index, 1);
      } else {
        console.log(`You cannot remove basket with id ${action.payload.id}`);
      }
      state.items = newBasket;
    },
    refreshBasket: (state) => {
      (state.restaurantId = null), (state.items = []);
    },
  },
});

export const { addToBasket, removeFromBasket, addRestautantId, refreshBasket } =
  basketSlice.actions;

export const selectBasketRestaurant = (state) => state.basket.restaurantId;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);

export default basketSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurants: [],
};

export const allRestaurantsSlice = createSlice({
  name: "allRestaurants",
  initialState,
  reducers: {
    setAllRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },
  },
});

export const { setAllRestaurants } = allRestaurantsSlice.actions;

export const selectAllRestaurants = (state) => state.allRestaurants.restaurants;

export default allRestaurantsSlice.reducer;

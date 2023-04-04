import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurants: [],
  featuredCategories: [],
};

export const allRestaurantsSlice = createSlice({
  name: "allRestaurants",
  initialState,
  reducers: {
    setAllRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },
    setFeaturedCategories: (state, action) => {
      state.featuredCategories = action.payload;
    },
  },
});

export const { setAllRestaurants, setFeaturedCategories } =
  allRestaurantsSlice.actions;

export const selectAllRestaurants = (state) => state.allRestaurants.restaurants;
export const selectFeaturedCategories = (state) =>
  state.allRestaurants.featuredCategories;

export default allRestaurantsSlice.reducer;

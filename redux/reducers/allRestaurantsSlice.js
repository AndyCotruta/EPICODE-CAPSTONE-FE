import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurants: [],
  featuredCategories: [],
  categories: [],
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
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setAllRestaurants, setFeaturedCategories, setCategories } =
  allRestaurantsSlice.actions;

export const selectAllRestaurants = (state) => state.allRestaurants.restaurants;
export const selectFeaturedCategories = (state) =>
  state.allRestaurants.featuredCategories;
export const selectCategories = (state) => state.allRestaurants.categories;

export default allRestaurantsSlice.reducer;

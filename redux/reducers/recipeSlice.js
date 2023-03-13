import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
  mainCategories: {
    breakfast: [],
    lunch: [],
    dinner: [],
  },
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipeActive: (state, action) => {
      state.active = action.payload;
    },
    addBreakfast: (state, action) => {
      state.mainCategories.breakfast = action.payload;
    },
    addLunch: (state, action) => {
      state.mainCategories.lunch = action.payload;
    },
    addDinner: (state, action) => {
      state.mainCategories.dinner = action.payload;
    },
  },
});

export const { setRecipeActive, addBreakfast, addDinner, addLunch } =
  recipeSlice.actions;

export const selectRecipeStatus = (state) => state.recipe.active;

export const selectBreakfast = (state) => state.recipe.mainCategories.breakfast;

export const selectLunch = (state) => state.recipe.mainCategories.lunch;

export const selectDinner = (state) => state.recipe.mainCategories.dinner;

export default recipeSlice.reducer;

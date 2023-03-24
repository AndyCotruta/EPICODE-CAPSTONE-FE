import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
  mainCategories: {
    breakfast: [],
    lunch: [],
    dinner: [],
  },
  activeRecipe: null,
  recipeNutrition: null,
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
    addActiveRecipe: (state, action) => {
      state.activeRecipe = action.payload;
    },
    addRecipeNutrition: (state, action) => {
      state.recipeNutrition = action.payload;
    },
  },
});

export const {
  setRecipeActive,
  addBreakfast,
  addDinner,
  addLunch,
  addActiveRecipe,
  addRecipeNutrition,
} = recipeSlice.actions;

export const selectRecipeStatus = (state) => state.recipe.active;

export const selectBreakfast = (state) => state.recipe.mainCategories.breakfast;
export const selectLunch = (state) => state.recipe.mainCategories.lunch;
export const selectDinner = (state) => state.recipe.mainCategories.dinner;

export const selectActiveRecipe = (state) => state.recipe.activeRecipe;
export const selectRecipeNutrition = (state) => state.recipe.recipeNutrition;

export default recipeSlice.reducer;

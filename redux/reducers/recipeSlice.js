import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipeActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setRecipeActive } = recipeSlice.actions;

export const selectRecipeStatus = (state) => state.recipe.active;

export default recipeSlice.reducer;

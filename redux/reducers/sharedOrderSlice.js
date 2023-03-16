import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initiatedBy: "",
  users: [],
  order: {
    restaurantId: "",
    dishes: [],
    totalPrice: "",
  },
};

export const sharedOrderSlice = createSlice({
  name: "sharedOrder",
  initialState,
  reducers: {
    addInitiatedBy: (state, action) => {
      state.initiatedBy = action.payload;
    },
  },
});

export const { addInitiatedBy } = sharedOrderSlice.actions;

export const selectInitiatedBy = (state) => state.sharedOrder.initiatedBy;

export default sharedOrderSlice.reducer;

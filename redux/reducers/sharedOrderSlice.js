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
    addSharedOrderUsers: (state, action) => {
      state.users = [...state.users, action.payload];
    },
  },
});

export const { addInitiatedBy, addSharedOrderUsers } = sharedOrderSlice.actions;

export const selectInitiatedBy = (state) => state.sharedOrder.initiatedBy;
export const selectSharedOrderUsers = (state) => state.sharedOrder.users;
export const selectSharedOrderDetails = (state) => state.sharedOrder.order;

export default sharedOrderSlice.reducer;

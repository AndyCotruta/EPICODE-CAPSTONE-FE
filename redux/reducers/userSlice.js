import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  userData: null,
  moveToDelivery: false,
  refreshOrder: false,
  mySharedDishes: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    addUserData: (state, action) => {
      state.userData = action.payload;
    },
    moveToDelivery: (state, action) => {
      state.moveToDelivery = action.payload;
    },
    refreshOrder: (state, action) => {
      state.refreshOrder = action.payload;
    },
    addMySharedDishes: (state, action) => {
      console.log(
        "This is the initial state of mySharedDishes: ",
        state.mySharedDishes
      );
      const existingDishIndex = state.mySharedDishes.findIndex(
        (dish) => dish.title === action.payload.title
      );
      if (existingDishIndex >= 0) {
        state.mySharedDishes[existingDishIndex].amount += 1;
      } else {
        state.mySharedDishes.push({ ...action.payload, amount: 1 });
      }
    },
    removeMySharedDishes: (state, action) => {
      console.log("This is what redux receives: ", action.payload);
      const existingDishIndex = state.mySharedDishes.findIndex(
        (dish) => dish.title === action.payload.title
      );
      if (existingDishIndex >= 0) {
        const existingDish = state.mySharedDishes[existingDishIndex];
        if (existingDish.amount === 1) {
          state.mySharedDishes.splice(existingDishIndex, 1);
        } else {
          state.mySharedDishes[existingDishIndex].amount -= 1;
        }
      }
    },
  },
});

export const {
  addAccessToken,
  addUserData,
  moveToDelivery,
  refreshOrder,
  addMySharedDishes,
  removeMySharedDishes,
} = userSlice.actions;

export const selectAccessToken = (state) => state.user.accessToken;

export const selectUserData = (state) => state.user.userData;

export const selectMoveToDelivery = (state) => state.user.moveToDelivery;

export const selectRefreshOrder = (state) => state.user.refreshOrder;

export const selectMySharedDishes = (state) => state.user.mySharedDishes;

export default userSlice.reducer;

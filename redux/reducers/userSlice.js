import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  userData: null,
  moveToDelivery: false,
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
  },
});

export const { addAccessToken, addUserData, moveToDelivery } =
  userSlice.actions;

export const selectAccessToken = (state) => state.user.accessToken;

export const selectUserData = (state) => state.user.userData;

export const selectMoveToDelivery = (state) => state.user.moveToDelivery;

export default userSlice.reducer;

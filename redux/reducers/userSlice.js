import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  userData: null,
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
  },
});

export const { addAccessToken, addUserData } = userSlice.actions;

export const selectAccessToken = (state) => state.user.accessToken;

export const selectUserData = (state) => state.user.userData;

export default userSlice.reducer;

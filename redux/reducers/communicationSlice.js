import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
};

export const communicationSlice = createSlice({
  name: "communication",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { addMessage } = communicationSlice.actions;

export const selectMessage = (state) => state.communication.message;

export default communicationSlice.reducer;

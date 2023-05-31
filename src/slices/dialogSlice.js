import { createSlice } from "@reduxjs/toolkit";

const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    stack: [],
  },
  reducers: {
    pushDialog: (state, action) => {
      state.stack.push(action.payload);
    },
    popDialog: (state) => {
      state.stack.pop();
    },
  },
});

export const dialogReducer = dialogSlice.reducer;
export const { pushDialog, popDialog } = dialogSlice.actions;
export default dialogSlice;

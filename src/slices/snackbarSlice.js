import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    stack: [],
  },
  reducers: {
    showSnackbar: (state, action) => {
      const snackbarId = uuid();
      state.stack.push({ id: snackbarId, ...action.payload });
    },
    shiftSnackbar: (state, action) => {
      state.stack.shift();
    },
  },
});

export const snackbarReducer = snackbarSlice.reducer;
export const { showSnackbar, shiftSnackbar } = snackbarSlice.actions;
export default snackbarSlice;

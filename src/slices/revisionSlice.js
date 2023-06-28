import { createSlice } from "@reduxjs/toolkit";

const revisionSlice = createSlice({
  name: "revision",
  initialState: {},
  reducers: {
    incrementDataRevision: (state, action) => {
      state[action.payload.event] = (state[action.payload.event] ?? 0) + 1;
    },
  },
});

export const revisionReducer = revisionSlice.reducer;
export const { incrementDataRevision } = revisionSlice.actions;
export default revisionSlice;
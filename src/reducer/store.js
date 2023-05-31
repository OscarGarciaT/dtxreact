import { configureStore } from "@reduxjs/toolkit";

import { dialogReducer } from "../slices/dialogSlice";

const store = configureStore({
  reducer: {
    dialog: dialogReducer,
  },
});

export default store;

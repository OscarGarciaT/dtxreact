import { configureStore } from "@reduxjs/toolkit";

import { dialogReducer } from "../slices/dialogSlice";
import { loginReducer } from "../slices/loginSlice";
import { userReducer } from "../slices/userSlice";
import { revisionReducer } from "../slices/revisionSlice";
import { snackbarReducer } from "../slices/snackbarSlice";


const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    login: loginReducer,
    user: userReducer,
    revision: revisionReducer,
    snackbar: snackbarReducer
  },
});

export default store;

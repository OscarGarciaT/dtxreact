import { configureStore } from "@reduxjs/toolkit";

import { dialogReducer } from "../slices/dialogSlice";
import { loginReducer } from "../slices/loginSlice";
import { userReducer } from "../slices/userSlice";
import { revisionReducer } from "../slices/revisionSlice";

const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    login: loginReducer,
    user: userReducer,
    revision: revisionReducer
  },
});

export default store;

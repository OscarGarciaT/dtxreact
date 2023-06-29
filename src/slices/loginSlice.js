import { createSlice } from "@reduxjs/toolkit";
import { setUserData } from "./userSlice";
import {
  registerUser,
  signInWithEmailAndPassword,
} from "../services/loginServices";

export const submitLogin =
  (data, onProgressOverride, onDoneOverride) => async (dispatch) => {
    if (onProgressOverride) onProgressOverride(true);
    let email = data?.email;
    let password = data?.password;

    dispatch(setLoginInProgress(true));
    return signInWithEmailAndPassword(
      email?.toLowerCase().trim(),
      password?.trim()
    ).then(
      (loginResponse) => {
        dispatch(setLoginInProgress(false));
        if (onProgressOverride) onProgressOverride(false);
        if (onDoneOverride) onDoneOverride(loginResponse);
        return dispatchLogin(dispatch, loginResponse);
      },
      (error) => {
        dispatch(setLoginInProgress(false));
        if (onProgressOverride) onProgressOverride(false);
        if (error?.message) {
          return dispatch(
            loginError([{ type: "generic", message: error?.message }])
          );
        } else {
          return dispatch(
            loginError([
              {
                type: "generic",
                message: "Algo salio mal, intenta de nuevo en unos momentos.",
              },
            ])
          );
        }
      }
    );
  };

export const submitSignUp = (data) => async (dispatch) => {
  const email = data?.email;
  const password = data?.password;
  const nombres = data?.nombres;
  const apellidos = data?.apellidos;
  const cargo = data?.cargo;
  const telefono = data?.telefono;

  const registerData = {
    email,
    password,
    nombres,
    apellidos,
    cargo,
    telefono,
  };

  dispatch(setLoginInProgress(true));
  return registerUser(registerData).then(
    (signUpResponse) => {
      dispatch(setLoginInProgress(false));
      return dispatchLogin(dispatch, signUpResponse);
    },
    (error) => {
      dispatch(setLoginInProgress(false));
      if (error?.message) {
        return dispatch(
          loginError([{ type: "generic", message: error?.message }])
        );
      } else {
        return dispatch(
          loginError([
            {
              type: "generic",
              message: "Algo salio mal, intenta de nuevo en unos momentos.",
            },
          ])
        );
      }
    }
  );
};

export const dispatchLogin = (dispatch, userData) => {
  dispatch(setUserData(userData));
  return dispatch(loginSuccess());
};

export const clearLoginErrors = () => async (dispatch) => {
  dispatch(clearErrors());
};

const initialState = {
  success: false,
  status: "login",
  inProgress: false,
  errors: [],
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginInProgress: (state, action) => {
      state.inProgress = !!action.payload;
    },
    loginSuccess: (state) => {
      state.success = true;
      state.inProgress = false;
      state.status = null;
      state.errors = [];
    },
    loginError: (state, action) => {
      state.success = false;
      state.inProgress = false;
      state.errors = action.payload;
    },
    setloginStatus: (state, action) => {
      state.status = action.payload;
    },
    clearErrors: (state) => {
      state.errors = [];
    },
  },
  extraReducers: {},
});

export const {
  setLoginInProgress,
  loginSuccess,
  loginError,
  setloginStatus,
  clearErrors,
} = loginSlice.actions;

export const loginReducer = loginSlice.reducer;

export default loginSlice;

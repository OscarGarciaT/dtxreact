import { createSlice } from "@reduxjs/toolkit";
import { clearUserData, getAuthToken } from "../services/loginServices";

export const setUserData = (data) => async (dispatch) => {
	dispatch(setUser(data));
};

export const logoutUser = () => async (dispatch) => {
	clearUserData();
	return dispatch(userLoggedOut());
};

const initialState = {
	role: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			return { ...action.payload, token: getAuthToken() };
		},
		userLoggedOut: () => initialState,
	},
	extraReducers: {},
});

export const { setUser, userLoggedOut } = userSlice.actions;

export const userReducer = userSlice.reducer;

export default userSlice;

import axios_core from "axios";
let API_URL = "http://localhost:3001/api";

if (process.env.NODE_ENV === "test") {
  API_URL = "http://localhost:5173/api";
} else if (window?.import?.meta?.env?.VITE_API_URL) {
  API_URL = window.import.meta.env.VITE_API_URL;
}

export const axiosConfig = {
  SERVER_NAME: API_URL,
  HEADERS: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("tokenDentelX"),
  },
};

export const createRequest = (timeout) => {
  return axios_core.create({
    baseURL: axiosConfig.SERVER_NAME,
    headers: axiosConfig.HEADERS,
    timeout,
  });
};

export const axios = axios_core.create({
	baseURL: axiosConfig.SERVER_NAME,
	headers: axiosConfig.HEADERS,
});
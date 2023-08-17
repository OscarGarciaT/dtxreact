import axios_core from "axios";
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";


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
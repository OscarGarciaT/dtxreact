import axios from "axios";
const API_URL = process?.env?.REACT_APP_API_URL ?? "http://localhost:3001";

export const axiosConfig = {
  SERVER_NAME: API_URL,
  HEADERS: {
    "Content-Type": "application/json",
  },
};

export const createRequest = (timeout) => {
  return axios.create({
    baseURL: axiosConfig.SERVER_NAME,
    headers: axiosConfig.HEADERS,
    timeout,
  });
};

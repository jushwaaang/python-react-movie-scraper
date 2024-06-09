import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL_API}/api`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

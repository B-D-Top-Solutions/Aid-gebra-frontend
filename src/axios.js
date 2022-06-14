import axios from "axios";
import store from "./store";

axios.defaults.headers = {
  token: sessionStorage.getItem("token"),
  "Content-Type": "Application/json",
};

const axiosClient = axios.create({
  baseURL: "http://localhost:3001",
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${store.state.user.token}`;
  return config;
});

export default axiosClient;

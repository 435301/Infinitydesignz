import axios from "axios";
import store from "../redux/store";
import { getToken } from "../utils/auth";

const instance = axios.create({
  baseURL: "http://68.183.89.229:4005", 
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Remove invalid token
      localStorage.removeItem("token");

      // Dispatch Redux action to show login modal globally
      store.dispatch({ type: "SHOW_LOGIN_MODAL" });
    }

    return Promise.reject(error);
  }
);

export default instance;

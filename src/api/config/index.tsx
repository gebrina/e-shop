import axios from "axios";
import { getCurrentUser } from "../../utils/auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const access_token = getCurrentUser()?.access_token;
    config.headers.Authorization = `Bearer ${access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

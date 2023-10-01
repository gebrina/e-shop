import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.env.VITE_APP_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

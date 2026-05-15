import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Client-side only

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;

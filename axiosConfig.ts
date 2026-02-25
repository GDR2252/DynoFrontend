import unAuthorizedHelper from "@/helpers/unAutorizedHelper";
import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
console.log("url for base", apiBaseUrl);

const axiosBaseApi = axios.create({
  baseURL: apiBaseUrl + "api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach token
axiosBaseApi.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete axiosBaseApi.defaults.headers.common.Authorization;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error); // propagate to try/catch
  },
);

// Response interceptor: handle errors like 500 and 403
axiosBaseApi.interceptors.response.use(
  (response) => response, // success responses
  (error) => {
    console.error("API Response error:", error.response ?? error.message);

    if (error.response?.status === 401) {
      // Remove token from browser storage
      localStorage.removeItem("token");

      // Remove axios default header
      delete axiosBaseApi.defaults.headers.common.Authorization;

      // Optional: redirect to login
      window.location.href = "/auth/login";
    }

    // Handle 403 (Unauthorized/Login Expired) - redirect to login
    if (error.response?.status === 403) {
      unAuthorizedHelper(error);
      return Promise.reject(error);
    }

    // Optional: you can return a standard format to always handle errors consistently
    return Promise.reject(error);
  },
);

export default axiosBaseApi;

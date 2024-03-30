import { message } from "antd";
import axios, { AxiosError } from "axios";
import { LocalStorageKeys } from "../utils/enum";

// Create an instance of axios
const axiosInstance = axios.create();

// Request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = JSON.parse(
      localStorage.getItem(LocalStorageKeys.token) ?? '""'
    );
    config.headers["Content-Type"] = "application/json";
    config.headers.Authorization = `Bearer ${token}`;
    // config.baseURL = `http://localhost:3000/api/v1`;
    config.baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  //If response received
  function (response) {
    const responseData: any = response.data;
    message.success(responseData.message);
    // Do something with response data
    return response;
  },
  function (error: AxiosError) {
    if (error.response) {
      const errorResponseData: any = error.response.data;
      // Do something with response error
      if (error.response.status === 401) {
        // Handle unauthorized error (e.g., redirect to login page)
        // window.location.href = ;
        console.log("Unauthorized");
      } else {
        // Handle other errors
        message.error(errorResponseData.message);
        console.error("Error from axios intercepter:", error);
      }
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;

import axios from "axios";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const api = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use((config) => {
  
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if response exists to avoid crashes
    if (!error.response) {
      console.error("Network or server error:", error);
      return Promise.reject(error);
    }

    // Refresh token logic
    console.log("original request retry state",originalRequest._retry);

    console.log("statsus",originalRequest._retry);
    if (error.response.status === 401 && originalRequest.headers["x-retry"]) {
      //originalRequest._retry = true;
      originalRequest.headers["x-retry"]=true;
      console.log("Token expired, attempting to refresh...");
      try {
        const { data } = await api.post("/auth/refresh-token");

        if (data.accessToken) {
          localStorage.setItem("token", data.accessToken);
          originalRequest.headers.Authorization = `${data.accessToken}`;
          return api(originalRequest); // Retry original request
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        window.location.href = "/auth/login"; // Redirect to login
      }
    }
   if(error.response.status===401)
   {
     console.error("Access forbidden:", error);
     window.location.href = "/auth/login"; // Redirect to login
   }
    return Promise.reject(error);
  }
);

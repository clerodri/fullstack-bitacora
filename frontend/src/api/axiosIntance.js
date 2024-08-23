import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;
export const apiUrl = `${apiBaseUrl}/api/${apiVersion}`;

//
export const axiosInstance = axios.create({
  baseURL: apiUrl, // Replace with your backend's base URL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosInstance;

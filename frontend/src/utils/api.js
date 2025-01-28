import axios from "axios";
import { getToken } from "./auth";

const API = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: { "Content-Type": "application/json" }, // Ensure JSON format
});
//request token if login has been successfully
API.interceptors.request.use(
  (config) => {
    const token = getToken(); //localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
//signup function
export const signup = async (userData) => {
  try {
    const response = await API.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Network error" };
  }
};
//login function
export const login = async (credentials) => {
  try {
    console.log("📤 Sending login request:", credentials);
    const response = await API.post("/auth/login", credentials);
    console.log("✅ Server response:", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error("Network error");
  }
};

export default API;

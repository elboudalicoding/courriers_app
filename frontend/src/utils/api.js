import axios from "axios";
import { getToken } from "./auth";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" }, // Ensure JSON format
});

// Request token if login has been successfully
API.interceptors.request.use(
  (config) => {
    const token = getToken(); // localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Signup function
export const signup = async (userData) => {
  try {
    const response = await API.post("/auth/signup", userData);
    console.log("✅ Server response:", response.data);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        error: "Network error <api.js> ,signup function",
      }
    );
  }
};

// Login function
export const login = async (credentials) => {
  try {
    const response = await API.post("/auth/login", credentials);
    console.log("✅ Server response:", response.data);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,login function")
    );
  }
};

// Create Courrier function
export const createCourrier = async (courrierData) => {
  try {
    const response = await API.post("/courriers", courrierData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("✅ Server response:", response.data);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,createCourrier function")
    );
  }
};

export default API;

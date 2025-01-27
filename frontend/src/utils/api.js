import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api", // Base URL pour les appels backend
});

// Ajouter automatiquement le token dans le header Authorization (si présent)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Récupérer le token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const signup = async (userData) => {
  try {
    const response = await API.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Network error" };
  }
};

export const login = async (credentials) => {
  try {
    const response = await API.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Network error" };
  }
};

export default API;

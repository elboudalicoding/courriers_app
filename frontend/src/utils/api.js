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
//fecthCourriersAD
export const fetchCourriersAD = async () => {
  try {
    const response = await API.get("/cad");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,fetchCourriers function")
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
//fonction ajouter depart
// Fonction pour créer un départ
export const creerDepart = async (departData) => {
  try {
    const response = await API.post("/depart", departData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("✅ Server response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la création du départ :",
      error.response?.data || error.message
    );
    throw error.response?.data || { error: "Erreur réseau" };
  }
};
// Fetch Courriers_departs function
export const fetchCourriersDeparts = async () => {
  try {
    const response = await API.get("/depart");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,fetchCourriers function")
    );
  }
};
// Fetch Courriers_arrivee function
export const fetchCourriersArrivee = async () => {
  try {
    const response = await API.get("/courriers/arrivee");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,fetchCourriers function")
    );
  }
};
// Fetch Courriers function
export const fetchCourriers = async () => {
  try {
    const response = await API.get("/courriers");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,fetchCourriers function")
    );
  }
};
// Download File function
export const downloadFile = async (id) => {
  try {
    const response = await API.get(`/courriers/download/${id}`, {
      responseType: "blob",
    });
    const contentDisposition = response.headers["content-disposition"];
    const fileName = contentDisposition
      ? contentDisposition.split("filename=")[1].replace(/"/g, "")
      : `file_${id}`;
    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: response.headers["content-type"] })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,downloadFile function")
    );
  }
};
// Download File_Depart function
export const downloadFileDepart = async (id) => {
  try {
    const response = await API.get(`/depart/download/${id}`, {
      responseType: "blob",
    });
    const contentDisposition = response.headers["content-disposition"];
    const fileName = contentDisposition
      ? contentDisposition.split("filename=")[1].replace(/"/g, "")
      : `file_${id}`;
    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: response.headers["content-type"] })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,downloadFile function")
    );
  }
};
// Create Entite Origine function
export const createEntiteOrigine = async (entiteOrigineData) => {
  try {
    const response = await API.post("/entites_origine", entiteOrigineData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,createEntiteOrigine function")
    );
  }
};
// Fetch Entites Origine function
export const fetchEntitesOrigine = async () => {
  try {
    const response = await API.get("/entites_origine");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,fetchEntitesOrigine function")
    );
  }
};
// Fetch Expediteur Names function
export const fetchExpediteurNames = async () => {
  try {
    const response = await API.get("/entites_origine/expediteurs");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,fetchExpediteurNames function")
    );
  }
};
// Fetch Courrier Details function
export const fetchCourrierDetails = async (id) => {
  try {
    const response = await API.get(`/courriers/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,fetchCourrierDetails function")
    );
  }
};
// Fetch Users function
export const fetchUsers = async () => {
  try {
    const response = await API.get("/users");
    return response.data; // ! WARNING  What is the difference between response and response.data ?
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,fetchUsers function")
    );
  }
};
export const createUser = async (user) => {
  try {
    const response = await API.post("/users", user);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,createUser function")
    );
  }
};
export const deleteUser = async (id) => {
  try {
    const response = await API.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,deleteUser function")
    );
  }
};
// Fetch Courrier Details function
export const fetchCourrierDetailsDepart = async (id) => {
  try {
    const response = await API.get(`/depart/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,deleteUser function")
    );
  }
};
export const updateUser = async (id, user) => {
  try {
    const response = await API.put(`/users/${id}`, user);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,updateUser function")
    );
  }
};

// Fetch Courrier Details function
export const DetailsDepart = async (id) => {
  try {
    const response = await API.get(`/depart/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,updateUser function")
    );
  }
};
export const fetchUserNames = async () => {
  try {
    const response = await API.get("/usernames");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,fetchUserNames function")
    );
  }
};

export const sendMail = async (mailData) => {
  try {
    const response = await API.post("/mails/send", mailData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,sendMail function")
    );
  }
};
// Fetch User Mails
export const fetchUserMails = async (userId) => {
  try {
    const response = await API.get(`/mails/${userId}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,fetchUserMails function")
    );
  }
};
// Fonction de recherche des arrivées
// Fonction de recherche des arrivées
export const onSearchArrivees = async (filtres) => {
  try {
    // Convertir les filtres en paramètres d'URL
    const params = new URLSearchParams();
    if (filtres.dateFrom) params.append("dateDebut", filtres.dateFrom);
    if (filtres.dateTo) params.append("dateFin", filtres.dateTo);
    if (filtres.etablissement)
      params.append("expediteur", filtres.etablissement);
    if (filtres.objet) params.append("objet", filtres.objet);
    //  console.log("Paramètres de la requête :", params.toString());
    //console.log("Valeur de filtres.objet :", filtres.objet);

    // Construire la requête avec les paramètres
    const queryString = params.toString();
    const response = await API.get(`/courriers/search?${queryString}`);

    // Ajoutez cette ligne pour inspecter la réponse
    //  console.log("✅ Réponse du serveur :", response.data);

    return response.data; // Retourne les données de la réponse
  } catch (error) {
    console.error("Erreur recherche arrivées:", error);
    // Gérer les erreurs et renvoyer une réponse utilisateur
    throw error.response?.data || { error: "Erreur réseau" };
  }
};

// Fetch Courriers function// Search Departs
export const onSearchDeparts = async (filtres) => {
  try {
    const params = new URLSearchParams();
    if (filtres.dateFrom) params.append("dateDebut", filtres.dateFrom);
    if (filtres.dateTo) params.append("dateFin", filtres.dateTo);
    if (filtres.etablissement)
      params.append("expediteur", filtres.etablissement);
    if (filtres.objet) params.append("objet", filtres.objet);

    const queryString = params.toString();
    const response = await API.get(`/depart/search?${queryString}`);

    return response.data;
  } catch (error) {
    console.error("Erreur recherche départs:", error);
    throw error.response?.data || { error: "Erreur réseau" };
  }
};
export const updateEntiteOrigine = async (id, entiteOrigine) => {
  try {
    const response = await API.put(`/entites_origine/${id}`, entiteOrigine);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Network error <api.js> ,updateEntiteOrigine function")
    );
  }
};

export default API;

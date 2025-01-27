// Sauvegarder le token dans le localStorage
export const saveToken = (token) => {
  localStorage.setItem("authToken", token);
};

// Récupérer le token depuis le localStorage
export const getToken = () => {
  return localStorage.getItem("authToken");
};

// Supprimer le token
export const removeToken = () => {
  localStorage.removeItem("authToken");
};

// Vérifier si un utilisateur est authentifié
export const isAuthenticated = () => {
  return !!getToken();
};

// Déconnexion de l'utilisateur
export const logout = () => {
  removeToken();
  window.location.href = "/login"; // Redirection après déconnexion
};

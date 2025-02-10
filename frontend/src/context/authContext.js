import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("authToken") !== null;
  });

  const login = () => setIsAuthenticated(true);

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken"); // Supprimer le token
    // localStorage.removeItem("isAuthenticated"); // Supprimer la persistance
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

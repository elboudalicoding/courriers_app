import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth, AuthProvider } from "./context/authContext";
import SignUp from "./pages/SignUp";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import C_Depart from "./pages/C_Depart/C_Depart";

function App() {
  const { isAuthenticated, login, logout } = useAuth();

  useEffect(() => {
    // Si l'utilisateur est déjà authentifié, on le connecte automatiquement
    if (localStorage.getItem("isAuthenticated") === "true") {
      login();
    }
  }, [login]);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
      <Routes>
      <Route path="/depart" component={C_Depart} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={ <Dashboard /> }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

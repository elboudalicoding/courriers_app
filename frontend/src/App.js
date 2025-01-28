import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth, AuthProvider } from "./context/authContext";

import SignUp from "./pages/SignUp";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    // Auto-login si l'utilisateur est déjà authentifié
    if (localStorage.getItem("authToken")) {
      login();
    }
  }, [login]);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
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

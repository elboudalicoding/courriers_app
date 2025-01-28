import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth, AuthProvider } from "./context/authContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
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
      {/* <Navbar isAuthenticated={isAuthenticated} /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
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

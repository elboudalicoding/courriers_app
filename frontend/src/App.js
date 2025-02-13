import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth, AuthProvider } from "./context/authContext";

import UserMails from "./pages/Courriers/userMails";


import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Navbar1 from "./components/Navbar1";
import Service from "./pages/Service";
import  Home1  from "./pages/Home";

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
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
         <Route
          path="/service"
          element={ <Service/> }
        />
         <Route
          path="/home"
          element={ <Home1/> }
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

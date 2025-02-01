import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth, AuthProvider } from "./context/authContext";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import CourriersTable from "./pages/mails_arrived";
import CreateNewArrivee from "./pages/CreateNewArrivee";
import Copy from "./pages/copy_create-new-courrier";
import Depart from "./pages/Courriers/Depart";
import CreerDepartForm from "./pages/Courriers/Ajouter_Depart";
import Liste_Arrive from "./pages/Courriers/Liste_Arrivee";
import EntitesOrigineTable from "./pages/EntitesOrigineTable";
import CreateEntiteOrigine from "./pages/CreateEntiteOrigine";
import CourrierDetails from "./pages/CourrierDetails";

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
        <Route path="/courrierDetails/:id" element={<CourrierDetails />} />
        <Route path="/CourriersTable" element={<CourriersTable />} />
        <Route path="/CreateNewArrivee" element={<CreateNewArrivee />} />
        <Route path="/copy" element={<Copy />} />
        <Route path="/entitesOrigineTable" element={<EntitesOrigineTable />} />
        <Route path="/createEntiteOrigine" element={<CreateEntiteOrigine />} />
        <Route path="/depart" element={<Depart />} />
        <Route path="/cdepart" element={<CreerDepartForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listeArrivee" element={<Liste_Arrive />} />
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

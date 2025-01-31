import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth, AuthProvider } from "./context/authContext";

import SignUp from "./pages/SignUp";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import CourriersTable from "./pages/mails_arrived";
import CreateNewArrivee from "./pages/CreateNewArrivee";
import Copy from "./pages/copy_create-new-courrier";
import Depart from "./pages/Courriers/Depart";
import CreerDepartForm from "./pages/Courriers/Ajouter_Depart";
<<<<<<< HEAD
import Liste_Arrive from "./pages/Courriers/Liste_Arrivee";
=======
import EntitesOrigineTable from "./pages/EntitesOrigineTable";
import CreateEntiteOrigine from "./pages/CreateEntiteOrigine";

>>>>>>> b84ec5d1c3caf2c6346c9ca29aa995ac54aa539f
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
        <Route path="/CourriersTable" element={<CourriersTable />} />
        <Route path="/CreateNewArrivee" element={<CreateNewArrivee />} />

        <Route path="/copy" element={<Copy />} />
        <Route path="/entitesOrigineTable" element={<EntitesOrigineTable />} />
        <Route path="/createEntiteOrigine" element={<CreateEntiteOrigine />} />

        <Route path="/depart" element={<Depart />} />
        <Route path="/cdepart" element={<CreerDepartForm />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
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

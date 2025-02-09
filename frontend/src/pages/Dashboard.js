import React, { useState } from "react";
import { Mail } from "lucide-react"; // Seul l'icône utilisé est importé
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import CourriersTable from "./mails_arrived";
import Depart from "./Courriers/Depart";
import CreateNewArrivee from "./CreateNewArrivee";
import EntitesOrigineTable from "./EntitesOrigineTable";
import CreateEntiteOrigine from "./CreateEntiteOrigine";
import SearchForm from "./Recherche/SearchForm"; // Importez le composant SearchForm
import UserList from "./Users/UsersList";
import Ajouter_Depart from "./Courriers/Ajouter_Depart"
const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const handleNavClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar1 onNavClick={handleNavClick} />

      {/* Contenu principal */}
      <div className="flex-grow flex items-center justify-center">
        {activeComponent === "dashboard" && (
          <div className="bg-white p-4 rounded shadow-md">
            <p className="text-blue-600 flex items-center">
              <Mail className="mr-2" />
              Bienvenue, Admin. Vous êtes dans votre espace de gestion des
              courriers.
            </p>
          </div>
        )}
        {activeComponent === "courriersTable" && (
          <CourriersTable onNavClick={handleNavClick} />
        )}
        {activeComponent === "depart" && <Depart onNavClick={handleNavClick} />}
        {activeComponent === "createNewArrivee" && (
          <CreateNewArrivee onNavClick={handleNavClick} />
        )}
        {activeComponent === "entitesOrigineTable" && (
          <EntitesOrigineTable onNavClick={handleNavClick} />
        )}
        {activeComponent === "createEntiteOrigine" && (
          <CreateEntiteOrigine onNavClick={handleNavClick} />
        )}
        {activeComponent === "userList" && (
          <UserList onNavClick={handleNavClick} />
        )}
        {activeComponent === "searchForm" && (
          <SearchForm onNavClick={handleNavClick} />
        )}
        {activeComponent === "ajouterDepart" && (
          <Ajouter_Depart onNavClick={handleNavClick} />
        )}
        {/* Ajout de la ligne */}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;

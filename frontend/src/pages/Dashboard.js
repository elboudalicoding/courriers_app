import React from "react";
import { Mail } from "lucide-react"; // Seul l'icône utilisé est importé
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
     
      <Navbar1 />
      
      {/* Contenu principal */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-4 rounded shadow-md">
          <p className="text-blue-600 flex items-center">
            <Mail className="mr-2" />
            Bienvenue, Admin. Vous êtes dans votre espace de gestion des courriers.
          </p>
        </div>
      </div>

      
      <Footer/>
    </div>
  );
};
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <div>Welcome to Dashboard</div>;
}

export default Dashboard;

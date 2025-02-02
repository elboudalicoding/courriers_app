import { Link } from "react-router-dom";
import {
  Home,
  Mail,
  School,
  BarChart,
  Search,
  User,
  LogOut,
} from "lucide-react";

export default function Navbar1({ onNavClick }) {
  return (
    <nav className="flex items-center justify-between bg-gradient-to-r from-blue-300 to-blue-300 text-white p-4 shadow-lg">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        {" "}
        {/* Augmenter l'espace entre le logo et les liens */}
        <img
          src="/images/logo.jpeg"
          alt="Logo Université"
          className="h-8 w-8 object-contain" // Augmenter la taille du logo en augmentant h-8 et w-8
        />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-12 text-sm">
        {" "}
        {/* Garde l'espace entre les liens */}
        <button
          onClick={() => onNavClick("courriersTable")}
          className="flex items-center space-x-2 hover:text-gray-300"
        >
          <Home className="w-5 h-5" />
          <span>Arrivée</span>
        </button>
        <button
          onClick={() => onNavClick("depart")}
          className="flex items-center space-x-2 hover:text-gray-300"
        >
          <Mail className="w-5 h-5" />
          <span>Départ</span>
        </button>
        <button
          onClick={() => onNavClick("entitesOrigineTable")}
          className="flex items-center space-x-2 hover:text-gray-300"
        >
          <School className="w-5 h-5" />
          <span>Établissements</span>
        </button>
        <Link
          to="/statistiques"
          className="flex items-center space-x-2 hover:text-gray-300"
        >
          <BarChart className="w-5 h-5" />
          <span>Statistiques</span>
        </Link>
        <Link
          to="/recherche"
          className="flex items-center space-x-2 hover:text-gray-300"
        >
          <Search className="w-5 h-5" />
          <span>Recherche</span>
        </Link>
        <Link
          to="/profile"
          className="flex items-center space-x-2 hover:text-gray-300"
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
      </div>

      {/* Admin Dropdown */}
      <div className="relative">
        <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg bg-gray-800 hover:bg-gray-700 text-sm">
          <User className="w-5 h-5" />
          <span>Admin</span>
          <span className="ml-2">
            <LogOut className="w-4 h-4" />{" "}
            {/* Petite flèche ou icône pour déconnexion */}
          </span>
        </button>
        {/* Dropdown options (optionnel) */}
        {/* Ajoutez un dropdown ici si nécessaire */}
      </div>
    </nav>
  );
}

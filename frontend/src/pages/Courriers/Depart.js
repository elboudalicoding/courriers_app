import React from "react";
import { Link } from "react-router-dom";
import Navbar1 from "../../components/Navbar1";

const courriers = [
  {
    id: 1,
    numero: "1202-25/2024",
    date: "2024-12-24 15:03:00",
    objet: "Réponse de Demande d'ouverture de Master en Génie Energ...",
    destine: "ENSA- UCD",
    signe: "SAHABI MOHAMED",
    traite: "secrétaire général",
    fichier: "Voir",
    actions: "Détails",
  },
];

const Depart = () => {
  // Fonction pour formater la date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString(); // Format local (selon la configuration locale)
  };

  return (
    <>
      <div className="flex justify-between items-center bg-blue-800 text-white rounded-t-lg px-4 py-2">
        <h2 className="text-xl font-bold">Liste des Courriers Départs</h2>
        {/* Lien vers la page AjouterDepart */}
        <Link
          to="/cdepart" // Cela redirige vers la page AjouterDepart
          className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
        >
          Créer Nouveau Départ
        </Link>
      </div>

      {/* Tableau avec marge autour */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-xs uppercase">
              <th className="py-1 px-2 border text-left whitespace-nowrap">
                N°BO
              </th>
              <th className="py-1 px-2 border text-left whitespace-nowrap">
                Date BO
              </th>
              <th className="py-1 px-2 border text-left whitespace-nowrap">
                Objet
              </th>
              <th className="py-1 px-2 border text-left whitespace-nowrap">
                Destiné à
              </th>
              <th className="py-1 px-2 border text-left whitespace-nowrap">
                Signé par
              </th>
              <th className="py-1 px-2 border text-left whitespace-nowrap">
                Traité par
              </th>
              <th className="py-1 px-2 border text-left whitespace-nowrap">
                Fichier
              </th>
              <th className="py-1 px-2 border text-left whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {courriers.map((courrier) => (
              <tr key={courrier.id} className="hover:bg-gray-100">
                <td className="py-1 px-2 border text-sm whitespace-nowrap">
                  {courrier.numero}
                </td>
                <td className="py-1 px-2 border text-sm whitespace-nowrap">
                  {formatDate(courrier.date)}
                </td>
                <td className="py-1 px-2 border text-sm truncate max-w-xs">
                  {courrier.objet}
                </td>
                <td className="py-1 px-2 border text-sm">{courrier.destine}</td>
                <td className="py-1 px-2 border text-sm">{courrier.signe}</td>
                <td className="py-1 px-2 border text-sm">{courrier.traite}</td>
                <td className="py-1 px-2 border text-sm">
                  <Link
                    to={`/fichier/${courrier.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {courrier.fichier}
                  </Link>
                </td>
                <td className="py-1 px-2 border text-sm">
                  <Link
                    to={`/details/${courrier.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {courrier.actions}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Depart;

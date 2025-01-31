import React, { useState } from "react";

// Simuler les données des courriers arrivés
const courriersArrives = [
  {
    id: 1,
    dateArrivee: "2025-01-25",
    entiteOrigine: "Entreprise A",
    objet: "Document important",
    traitePar: "Utilisateur 1",
    file: "document1.pdf",
  },
  {
    id: 2,
    dateArrivee: "2025-01-26",
    entiteOrigine: "Entreprise B",
    objet: "Facture",
    traitePar: "Utilisateur 2",
    file: "facture.pdf",
  },
  // Ajouter plus de courriers si nécessaire
];

const Liste_Arrive = () => {
  const [courriers, setCourriers] = useState(courriersArrives);

  const handleTransferer = (courrierId) => {
    // Logique pour transférer le courrier à un utilisateur
    // Cela peut impliquer un appel API pour modifier la base de données ou mettre à jour l'état local

    alert(`Transfert du courrier ${courrierId} effectué`);
    // Ici, tu peux ajouter la logique de transfert, comme par exemple :
    // Mettre à jour l'état "traitePar" pour ce courrier
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      <h2 className="text-xl font-semibold mb-6">Liste des Courriers Arrivés</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Date</th>
            <th className="px-4 py-2 border-b text-left">Expéditeur</th>
            <th className="px-4 py-2 border-b text-left">Objet</th>
            <th className="px-4 py-2 border-b text-left">Traité par</th>
            <th className="px-4 py-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courriers.map((courrier) => (
            <tr key={courrier.id}>
              <td className="px-4 py-2 border-b">{courrier.dateArrivee}</td>
              <td className="px-4 py-2 border-b">{courrier.entiteOrigine}</td>
              <td className="px-4 py-2 border-b">{courrier.objet}</td>
              <td className="px-4 py-2 border-b">{courrier.traitePar}</td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleTransferer(courrier.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Transférer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Liste_Arrive;

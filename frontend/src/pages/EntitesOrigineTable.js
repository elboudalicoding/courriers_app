import { useState, useEffect } from "react";
import { Button } from "../components/ui/buttton";
import { fetchEntitesOrigine } from "../utils/api";

const EntitesOrigineTable = ({ onNavClick }) => {
  const [etablissements, setEtablissements] = useState([]);

  useEffect(() => {
    const getEntitesOrigine = async () => {
      try {
        const data = await fetchEntitesOrigine();
        setEtablissements(data);
      } catch (error) {
        console.error("❌ Error fetching entites origine:", error);
      }
    };

    getEntitesOrigine();
  }, []);

  const handleButtonClick = () => {
    onNavClick("createEntiteOrigine");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center bg-blue-900 text-white p-4 rounded-t-lg">
        <h2 className="text-lg font-semibold">📋 Liste des Établissements</h2>
        <Button
          onClick={handleButtonClick}
          className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600"
        >
          ➕ Ajouter un Établissement
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "ID",
                "Nom",
                "Ville",
                "Contact",
                "Fax",
                "Adresse",
                "Actions",
              ].map((header) => (
                <th key={header} className="px-4 py-2 border">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {etablissements.map((etab, index) => (
              <tr key={index} className="border text-center hover:bg-gray-100">
                <td className="px-4 py-2">{etab.id}</td>
                <td className="px-4 py-2">{etab.nom}</td>
                <td className="px-4 py-2">{etab.ville}</td>
                <td className="px-4 py-2">{etab.contact}</td>
                <td className="px-4 py-2">{etab.fax}</td>
                <td className="px-4 py-2">{etab.adresse}</td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Voir
                  </button>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                    Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EntitesOrigineTable;

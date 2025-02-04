import React, { useState, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { fetchEntitesOrigine, onSearchArrivees, onSearchDeparts } from "../../utils/api";

export default function SearchForm() {
  const [filters, setFilters] = useState({
    type: "",
    dateFrom: "",
    dateTo: "",
    etablissement: "",
    objet: "",
  });

  const [etablissements, setEtablissements] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEtablissements = async () => {
      try {
        const data = await fetchEntitesOrigine();
        setEtablissements(data);
      } catch (error) {
        setError("Impossible de charger les établissements.");
      }
    };
    getEtablissements();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Champ modifié : ${name}, Valeur : ${value}`);
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulaire soumis");
    setError(null);
    setResults([]);
    setLoading(true);

    if (!filters.objet.trim()) {
      setError("Le champ 'Objet' est obligatoire.");
      setLoading(false);
      return;
    }

    if (new Date(filters.dateFrom) > new Date(filters.dateTo)) {
      setError("La date de début doit être inférieure ou égale à la date de fin.");
      setLoading(false);
      return;
    }

    try {
      console.log("Valeurs des filtres avant la requête :", filters);
      let result = 
        filters.type === "Arrivées"
          ? await onSearchArrivees(filters)
          : filters.type === "Départs"
          ? await onSearchDeparts(filters)
          : [];

      setResults(Array.isArray(result) ? result : []);
    } catch (error) {
      setError("Erreur lors de la requête.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl shadow-lg bg-white rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-600 text-center mb-6"> Recherche des arrivées et des départs</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="">Sélectionner un type</option>
                <option value="Arrivées">Arrivées</option>
                <option value="Départs">Départs</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">De</label>
              <input
                type="date"
                name="dateFrom"
                value={filters.dateFrom}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">À</label>
              <input
                type="date"
                name="dateTo"
                value={filters.dateTo}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Établissement</label>
              <select
                name="etablissement"
                value={filters.etablissement}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="">Sélectionner un établissement</option>
                {etablissements.map((etab) => (
                  <option key={etab.id} value={etab.nom}>{etab.nom}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Objet</label>
              <input
                type="text"
                name="objet"
                placeholder="Rechercher par objet"
                value={filters.objet}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
              disabled={loading || !filters.objet.trim()}
            >
              <SearchIcon size={16} /> {loading ? "Recherche..." : "Rechercher"}
            </button>
          </div>
          
        </form>

        {filters.type === "Arrivées" && results.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-blue-600">Courriers Arrivées</h3>
            <table className="w-full mt-6 border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Référence</th>
                  <th className="border border-gray-300 p-2">Objet</th>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">Fichier</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 p-2">{item.entite_origine}</td>
                    <td className="border border-gray-300 p-2">{item.objet}</td>
                    <td className="border border-gray-300 p-2">{item.date_arrivee}</td>
                    <td className="border border-gray-300 p-2">
                      {item.file ? (
                        <a href={item.file} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                          Télécharger
                        </a>
                      ) : (
                        "Aucun fichier"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filters.type === "Départs" && results.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-blue-600">Courriers de Départ</h3>
            <table className="w-full mt-6 border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Destination</th>
                  <th className="border border-gray-300 p-2">Objet</th>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">Fichier</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 p-2">{item.destination}</td>
                    <td className="border border-gray-300 p-2">{item.objet}</td>
                    <td className="border border-gray-300 p-2">{item.dateHeure}</td>
                    <td className="border border-gray-300 p-2">
                      {item.fichier ? (
                        <a href={item.fichier} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                          Télécharger
                        </a>
                      ) : (
                        "Aucun fichier"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { fetchEntitesOrigine, updateEntiteOrigine } from "../utils/api";
import Modal from "../components/Modal";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const EntitesOrigineTable = () => {
  const [etablissements, setEtablissements] = useState([]);
  const [selectedEtablissement, setSelectedEtablissement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getEtablissements = async () => {
      try {
        const data = await fetchEntitesOrigine();
        setEtablissements(data);
      } catch (error) {
        console.error("Error fetching entites origine:", error);
      }
    };

    getEtablissements();
  }, []);

  const handleEditClick = (etab) => {
    setSelectedEtablissement(etab);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEtablissement(null);
  };

  const handleSave = async () => {
    try {
      await updateEntiteOrigine(
        selectedEtablissement.id,
        selectedEtablissement
      );
      const updatedEtablissements = await fetchEntitesOrigine();
      setEtablissements(updatedEtablissements);
      handleModalClose();
    } catch (error) {
      console.error("Error updating entite origine:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEtablissement((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        Liste des Entités d'Origine
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Ville</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Fax</th>
              <th className="px-4 py-2">Adresse</th>
              <th className="px-4 py-2">Actions</th>
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
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    onClick={() => handleEditClick(etab)}
                  >
                    Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="p-6 bg-white rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Modifier Entité d'Origine
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold">Nom</label>
                <Input
                  name="nom"
                  value={selectedEtablissement.nom}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-semibold">Ville</label>
                <Input
                  name="ville"
                  value={selectedEtablissement.ville}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-semibold">Contact</label>
                <Input
                  name="contact"
                  value={selectedEtablissement.contact}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-semibold">Fax</label>
                <Input
                  name="fax"
                  value={selectedEtablissement.fax}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-semibold">Adresse</label>
                <Textarea
                  name="adresse"
                  value={selectedEtablissement.adresse}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={handleModalClose}>
                Annuler
              </Button>
              <Button className="bg-blue-500 text-white" onClick={handleSave}>
                Enregistrer
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EntitesOrigineTable;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { downloadFileDepart, fetchCourriersDeparts } from "../../utils/api";
import {
  FaInfoCircle,
  FaDownload,
} from "react-icons/fa";
import CourrierDetailsDepart from "./Courrier_Depart_Details";
import Modal from "../../components/Modal";

const Depart = ({ id }) => {
  const [courrier, setCourrier] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourrierId, setSelectedCourrierId] = useState(null);

  useEffect(() => {
    const getCourrierDetails = async () => {
      try {
        const data = await fetchCourriersDeparts(id);
        console.log("Données reçues:", data); 
        setCourrier(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getCourrierDetails();
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!courrier) {
    return <div>Loading...</div>;
  }

  // Fonction pour formater la date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString(); // Format local (selon la configuration locale)
  };

  const handleDetailClick = (id) => {
    setSelectedCourrierId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourrierId(null);
  };

  return (
    <>
      <div className="flex flex-col">
        {/* Première ligne : Titre et Bouton */}
        <div className="flex justify-between items-center bg-blue-800 text-white rounded-t-lg px-6 py-3 mb-6">
          <h2 className="text-2xl font-bold">Liste des Courriers Départs</h2>
          {/* Lien vers la page AjouterDepart */}
          <Link
            to="/cdepart"
            className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-6 rounded"
          >
            Créer Nouveau Départ
          </Link>
        </div>

        {/* Deuxième ligne : Tableau */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-base">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-base uppercase">
                <th className="py-3 px-6 border text-left">N°BO</th>
                <th className="py-3 px-6 border text-left">Date BO</th>
                <th className="py-3 px-6 border text-left">Objet</th>
                <th className="py-3 px-6 border text-left">Destiné à</th>
                <th className="py-3 px-6 border text-left">Signé par</th>
                <th className="py-3 px-6 border text-left">Traité par</th>
                <th className="py-3 px-6 border text-left">Fichier</th>
                <th className="py-3 px-6 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courrier.map((courrier) => (
                <tr key={courrier.id} className="hover:bg-gray-100">
                  <td className="py-3 px-6 border text-base">{courrier.numeroOrdre}</td>
                  <td className="py-3 px-6 border text-base">{formatDate(courrier.dateHeure)}</td>
                  <td className="py-3 px-6 border text-base truncate max-w-xs">{courrier.objet}</td>
                  <td className="py-3 px-6 border text-base">{courrier.destination}</td>
                  <td className="py-3 px-6 border text-base">{courrier.signePar}</td>
                  <td className="py-3 px-6 border text-base">{courrier.traitePar}</td>
                  <td className="py-3 px-6 border text-base">
                    <button 
                      onClick={() => downloadFileDepart(courrier.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-700"
                    >
                      <FaDownload /> <span>Télécharger</span>
                    </button>
                  </td>
                  <td className="py-3 px-6 border text-base">
                    <button 
                      onClick={() => handleDetailClick(courrier.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-700"
                    >
                      <FaInfoCircle /> <span>Détails</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <CourrierDetailsDepart id={selectedCourrierId} />
        </Modal>
      </div>
    </>
  );
};

export default Depart;

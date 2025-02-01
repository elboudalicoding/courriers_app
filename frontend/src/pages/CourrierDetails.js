import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCourrierDetails } from "../utils/api";
import {
  FaEnvelope,
  FaCalendar,
  FaIdCard,
  FaUser,
  FaFileAlt,
  FaFile,
  FaEye,
  FaDownload,
  FaBox,
} from "react-icons/fa";

const CourrierDetails = ({ id }) => {
  const [courrier, setCourrier] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCourrierDetails = async () => {
      try {
        const data = await fetchCourrierDetails(id);
        
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

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-5 border border-gray-200">
      <div className="flex items-center space-x-2 border-b pb-3 mb-3">
        <FaEnvelope className="text-blue-600" size={20} />
        <h2 className="text-lg font-semibold text-blue-600">
          Détails du Courrier
        </h2>
      </div>

      <div className="space-y-3 text-gray-700">
        <div className="flex items-center space-x-2">
          <FaCalendar className="text-gray-500" />
          <span>
            <strong>Date:</strong> {courrier.date_arrivee}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <FaIdCard className="text-gray-500" />
          <span>
            <strong>ID et Année:</strong> {courrier.id_annee}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-500" />
          <span>
            <strong>Expéditeur:</strong> {courrier.entite_origine}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <FaFileAlt className="text-gray-500" />
          <span>
            <strong>Objet:</strong> {courrier.objet}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <FaFile className="text-gray-500" />
          <span>
            <strong>Type du support:</strong> {courrier.type_support}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <FaFile className="text-gray-500" />
          <span>
            <strong>Type de courrier:</strong> {courrier.type_courrier}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <FaEye className="text-gray-500" />
          <span>
            <strong>Fiche:</strong>
          </span>
          <button className="bg-blue-600 text-white px-3 py-1 rounded flex items-center space-x-1 hover:bg-blue-700">
            <FaEye /> <span>Voir</span>
          </button>
          <button className="bg-gray-400 text-white px-3 py-1 rounded flex items-center space-x-1 hover:bg-gray-500">
            <FaDownload /> <span>Télécharger</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <FaBox className="text-gray-500" />
          <span>
            <strong>Nombre de Pièces:</strong> {courrier.nombre_pieces_jointes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourrierDetails;

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableType,
  TableSupport,
} from "../components/ui/table";
import { FaDownload } from "react-icons/fa";
import { Button } from "../components/ui/button";
import { fetchCourriers, downloadFile } from "../utils/api";
import Modal from "../components/Modal";
import CourrierDetails from "./CourrierDetails";
import MailSend from "./Courriers/mailSend";

const CourriersTable = ({ onNavClick }) => {
  const [courriers, setCourriers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedCourrierId, setSelectedCourrierId] = useState(null);

  useEffect(() => {
    const getCourriers = async () => {
      try {
        const data = await fetchCourriers();
        setCourriers(data);
      } catch (error) {
        console.error("❌ Error fetching courriers:", error);
      }
    };

    getCourriers();
  }, []);

  const handleButtonClick = () => {
    onNavClick("createNewArrivee");
  };

  const handleDetailClick = (id) => {
    setSelectedCourrierId(id);
    setIsModalOpen(true);
  };

  const handleDownloadClick = async (id) => {
    try {
      await downloadFile(id);
    } catch (error) {
      console.error("❌ Error downloading file:", error);
    }
  };

  const handleSendClick = () => {
    setIsTransferModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourrierId(null);
  };

  const closeTransferModal = () => {
    setIsTransferModalOpen(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Liste des Courriers Arrivés</h2>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={handleButtonClick}
        >
          Créer un nouveau Arrivée
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead>Date d’UCD</TableHead>
            <TableHead>N° UCD</TableHead>
            <TableHead>Date d’origine</TableHead>
            <TableHead>N° d’origine</TableHead>
            <TableHead>Entité d’origine</TableHead>
            <TableHead>Objet</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Support</TableHead>
            <TableHead>Fichier</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courriers.map((item, index) => (
            <TableRow key={index} className="border-b">
              <TableCell>{item.date_arrivee}</TableCell>
              <TableCell>{item.id_annee}</TableCell>
              <TableCell>{item.date_origine}</TableCell>
              <TableCell>{item.numero_origine}</TableCell>
              <TableCell>{item.entite_origine}</TableCell>
              <TableCell>{item.objet}</TableCell>
              <TableType type={item.type_courrier} />
              <TableSupport support={item.type_support} />
              <TableCell>
                {item.file && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDownloadClick(item.id)}
                  >
                    <FaDownload /> <span>Télécharger</span>
                  </Button>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDetailClick(item.id)}
                  >
                    Details
                  </Button>
                  <Button size="sm" variant="ghost" onClick={handleSendClick}>
                    Send
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CourrierDetails id={selectedCourrierId} />
      </Modal>
      <MailSend isOpen={isTransferModalOpen} onClose={closeTransferModal} />
    </div>
  );
};

export default CourriersTable;

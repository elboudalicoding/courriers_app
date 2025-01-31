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
import { Button } from "../components/ui/buttton";
import { useNavigate } from "react-router-dom";
import { fetchCourriers } from "../utils/api";

const CourriersTable = () => {
  const navigate = useNavigate();
  const [courriers, setCourriers] = useState([]);

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
    navigate("/CreateNewArrivee");
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
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">
                    Voir
                  </Button>
                  <Button size="sm" variant="ghost">
                    Filtrer
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourriersTable;

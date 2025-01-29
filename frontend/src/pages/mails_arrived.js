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
import React from "react";

const data = [
  {
    dateUCD: "24-12-2024",
    numUCD: "29/2024",
    dateOrigine: "24-12-2024",
    numOrigine: "549745",
    entite: "ENSA - UCD",
    objet: "Demande d’ouverture de Master en Génie Énergétique (GE)",
    type: "urgence",
    support: "papier",
  },
  {
    dateUCD: "24-12-2024",
    numUCD: "28/2024",
    dateOrigine: "24-12-2024",
    numOrigine: "45",
    entite: "FPSB - UCD",
    objet: "مرحبا بكم في فضاء الترشح علي بوابة التشغيل العمومي EE",
    type: "confidentiel",
    support: "papier",
  },
  {
    dateUCD: "24-12-2024",
    numUCD: "27/2024",
    dateOrigine: "24-12-2024",
    numOrigine: "3633",
    entite: "ENSA - UCD",
    objet: "مرحبا بكم في فضاء الترشح علي بوابة التشغيل العمومي",
    type: "urgence",
    support: "numerique",
  },
];

const CourriersTable = () => {
  const navigate = useNavigate(); // Add navigate hook

  const handleButtonClick = () => {
    navigate("/create-new-arrivee"); // Redirects to the desired page
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Liste des Courriers Arrivés</h2>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={handleButtonClick} // Attach redirection logic
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
          {data.map((item, index) => (
            <TableRow key={index} className="border-b">
              <TableCell>{item.dateUCD}</TableCell>
              <TableCell>{item.numUCD}</TableCell>
              <TableCell>{item.dateOrigine}</TableCell>
              <TableCell>{item.numOrigine}</TableCell>
              <TableCell>{item.entite}</TableCell>
              <TableCell>{item.objet}</TableCell>
              <TableType type={item.type} />
              <TableSupport support={item.support} />
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

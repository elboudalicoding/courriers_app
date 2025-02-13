import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserMails } from "../../utils/api";
import { FaDownload } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import { downloadFile } from "../../utils/api";

const UserMails = () => {
  const { userId } = useParams();
  const [mails, setMails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserMails = async () => {
      try {
        const data = await fetchUserMails(userId);
        setMails(data);
      } catch (error) {
        console.error("Error fetching mails:", error);
        setError("Error fetching mails");
      }
    };

    getUserMails();
  }, [userId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  const handleDownloadClick = async (id) => {
    try {
      await downloadFile(id);
    } catch (error) {
      console.error("❌ Error downloading file:", error);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">User Mails</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-blue-500 text-white">   
              <th className="px-4 py-2 border">Note</th>
              <th className="px-4 py-2 border">Subject</th>
              <th className="px-4 py-2 border">Entite_origine</th>
              <th className="px-4 py-2 border">Nombre_pieces</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Fichier</th>
            </tr>
          </thead>
          <tbody>
            {mails.map((mail, index) => (
              <tr
                key={mail.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200`}
              >
                <td className="px-4 py-2 border">{mail.note}</td>
                <td className="px-4 py-2 border">{mail.objet}</td>
                <td className="px-4 py-2 border">{mail.entite_origine}</td>
                <td className="px-4 py-2 border">
                  {mail.nombre_pieces_jointes}
                </td>
                <td className="px-4 py-2 border">{mail.date_arrivee}</td>
                <td className="px-4 py-2 border">{mail.type_courrier}</td>
                <td className="px-4 py-2 border">
                  {mail.file_name ? (
                    <Button
                      size="sm"
                      onClick={() => handleDownloadClick(mail.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-700"
                    >
                      <FaDownload /> <span>Télécharger</span>
                    </Button>
                  ) : (
                    "No file"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserMails;

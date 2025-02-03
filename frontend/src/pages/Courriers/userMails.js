import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserMails } from "../../utils/api";

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

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">📧 Mes Courriers</h2>
      <ul>
        {mails.map((mail) => (
          <li key={mail.id} className="border-b border-gray-300 py-2">
            <p>{mail.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserMails;
import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { Button } from "../../components/ui/button";
import { Select } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Checkbox } from "../../components/ui/checkbox";
import { UserIcon } from "lucide-react";
import { fetchUserNames, sendMail } from "../../utils/api";

export default function TransferMailModal({ isOpen, onClose }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [ccUsers, setCcUsers] = useState([]);
  const [note, setNote] = useState("");
  const [ccNote, setCcNote] = useState("");

  useEffect(() => {

    const getUsers = async () => {
      try {
        const data = await fetchUserNames();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, []);

  const handleTransfer = async () => {
    if (!selectedUser) return;
    try {
      await sendMail({
        username: selectedUser,
        ccUsers,
        note,
        ccNote,
      });
      alert("Email sent successfully!");
      onClose();
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 rounded-lg w-full max-w-md bg-white">
        <div className="border-b border-gray-200 pb-3 mb-3">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Transférer le Courrier
          </h3>
        </div>

        <div className="space-y-4">
          {/* Destiné à */}
          <div>
            <label className="font-semibold flex items-center">
              📩 Destiné à :
            </label>
            <Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Sélectionnez un utilisateur principal</option>
              {users.map((user) => (
                <option key={user.id} value={user.nom}>
                  {user.nom}
                </option>
              ))}
            </Select>
          </div>

          {/* Note */}
          <div>
            <label className="font-semibold">💬 Note :</label>
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} />
          </div>

          {/* CC Users */}
          <div>
            <label className="font-semibold flex items-center">👥 Cc :</label>
            <div className="space-y-2">
              {users.map((user) => (
                <div key={user.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={ccUsers.includes(user.nom)}
                    onCheckedChange={() =>
                      setCcUsers((prev) =>
                        prev.includes(user.nom)
                          ? prev.filter((u) => u !== user.nom)
                          : [...prev, user.nom]
                      )
                    }
                  />
                  <UserIcon className="w-4 h-4" />
                  <span>{user.nom}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CC Note */}
          <div>
            <label className="font-semibold">💬 Note (Cc) :</label>
            <Textarea
              value={ccNote}
              onChange={(e) => setCcNote(e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button
            disabled={!selectedUser}
            className="bg-blue-500 text-white"
            onClick={handleTransfer}
          >
            Transférer
          </Button>
        </div>
      </div>
    </Modal>
  );
}

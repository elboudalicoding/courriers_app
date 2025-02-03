import React, { useEffect, useState } from "react";
import { fetchUsers, createUser, deleteUser, updateUser } from "../../utils/api";
import { FaTrash, FaEdit, FaUserPlus } from "react-icons/fa"; // Import icons

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newUser, setNewUser] = useState({
    nom: "",
    email: "",
    role: "Agent",
    service: "",
    code: "",
    password: "",
  });
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
        setError("Erreur lors de la récupération des utilisateurs");
      }
    };

    getUsers();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const handleAddUser = () => {
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(newUser);
      setShowModal(false);
      setNewUser({
        nom: "",
        email: "",
        role: "Agent",
        service: "",
        code: "",
        password: "",
      });
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur", error);
      setError("Erreur lors de la création de l'utilisateur");
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userToDelete.id);
      setShowDeleteModal(false);
      setUserToDelete(null);
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur", error);
      setError("Erreur lors de la suppression de l'utilisateur");
    }
  };

  const handleEditClick = (user) => {
    setUserToEdit(user);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUserToEdit((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(userToEdit.id, userToEdit);
      setShowEditModal(false);
      setUserToEdit(null);
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur", error);
      setError("Erreur lors de la modification de l'utilisateur");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📋 Liste des Utilisateurs</h2>
        <button
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center"
          onClick={handleAddUser}
        >
          <FaUserPlus className="mr-2" /> Ajouter un utilisateur
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 border-b border-gray-300">Nom</th>
            <th className="py-2 px-4 border-b border-gray-300">Email</th>
            <th className="py-2 px-4 border-b border-gray-300">Rôle</th>
            <th className="py-2 px-4 border-b border-gray-300">Service</th>
            <th className="py-2 px-4 border-b border-gray-300">Code</th>
            <th className="py-2 px-4 border-b border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-300">{user.nom}</td>
              <td className="py-2 px-4 border-b border-gray-300">{user.email}</td>
              <td className="py-2 px-4 border-b border-gray-300">{user.role}</td>
              <td className="py-2 px-4 border-b border-gray-300">{user.service}</td>
              <td className="py-2 px-4 border-b border-gray-300">{user.code}</td>
              <td className="py-2 px-4 border-b border-gray-300">
                <button
                  className="bg-yellow-500 text-white p-2 rounded mr-2 hover:bg-yellow-600"
                  onClick={() => handleEditClick(user)}
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  onClick={() => handleDeleteClick(user)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Ajouter un utilisateur</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={newUser.nom}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Rôle</label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Administrateur">Administrateur</option>
                  <option value="Agent">Agent</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Service</label>
                <input
                  type="text"
                  name="service"
                  value={newUser.service}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Code</label>
                <input
                  type="text"
                  name="code"
                  value={newUser.code}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white p-2 rounded mr-2 hover:bg-gray-600"
                  onClick={() => setShowModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Modifier un utilisateur</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={userToEdit.nom}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userToEdit.email}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Rôle</label>
                <select
                  name="role"
                  value={userToEdit.role}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Administrateur">Administrateur</option>
                  <option value="Agent">Agent</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Service</label>
                <input
                  type="text"
                  name="service"
                  value={userToEdit.service}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Code</label>
                <input
                  type="text"
                  name="code"
                  value={userToEdit.code}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white p-2 rounded mr-2 hover:bg-gray-600"
                  onClick={() => setShowEditModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Modifier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirmer la suppression</h2>
            <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="bg-gray-500 text-white p-2 rounded mr-2 hover:bg-gray-600"
                onClick={() => setShowDeleteModal(false)}
              >
                Annuler
              </button>
              <button
                type="button"
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
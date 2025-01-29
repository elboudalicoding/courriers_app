import React, { useState } from "react";
import { createCourrier } from "../utils/api";
import { useNavigate } from "react-router-dom";

const CreateNewArrivee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date_arrivee: "",
    id_annee: "",
    date_origine: "",
    num_origine: "",
    expediteur: "",
    objet: "",
    nb_pieces_jointes: 0,
    type_support: "Papier",
    type_courrier: "Confidentiel",
    file: null,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    try {
      await createCourrier(formDataToSend);
      navigate("/courriersTable");
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Créer un Courrier Arrivé
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Date d’Arrivée:</label>
              <input
                type="datetime-local"
                name="date_arrivee"
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-600">ID et Année:</label>
              <input
                type="text"
                name="id_annee"
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600">Date d’Origine:</label>
            <input
              type="date"
              name="date_origine"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-600">Numéro:</label>
            <input
              type="text"
              name="num_origine"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-600">Expéditeur:</label>
            <input
              type="text"
              name="expediteur"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-600">Objet:</label>
            <textarea
              name="objet"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded h-20"
            />
          </div>

          <div>
            <label className="block text-gray-600">
              Nombre de pièces jointes:
            </label>
            <input
              type="number"
              name="nb_pieces_jointes"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Type de support:</label>
              <select
                name="type_support"
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Papier">Papier</option>
                <option value="Numérique">Numérique</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600">Type de courrier:</label>
              <select
                name="type_courrier"
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Confidentiel">Confidentiel</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-600">Choisir un fichier:</label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Créer
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewArrivee;
 
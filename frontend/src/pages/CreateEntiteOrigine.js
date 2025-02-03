import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEntiteOrigine } from "../utils/api";

const CreateEntiteOrigine = ({ onNavClick }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    ville: "",
    contact: "",
    fax: "",
    adresse: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEntiteOrigine(formData);
      onNavClick("entitesOrigineTable");
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Créer une Entité Origine
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-gray-600">Nom:</label>
            <input
              type="text"
              name="nom"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-600">Ville:</label>
            <input
              type="text"
              name="ville"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-600">Contact:</label>
            <input
              type="text"
              name="contact"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-600">Fax:</label>
            <input
              type="text"
              name="fax"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-600">Adresse:</label>
            <textarea
              name="adresse"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded h-20"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEntiteOrigine;

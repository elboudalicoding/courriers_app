import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import { FileText, Plus } from "lucide-react";
import { creerDepart } from "../../utils/api"; // Import de l'API

const CreerDepartForm = () => {
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection
  const [showModal, setShowModal] = useState(false);
  const [newDestination, setNewDestination] = useState("");
  const [formData, setFormData] = useState({
    signePar: "",
    numeroOrdre: "",
    objet: "",
    file: null,
    traitePar: "",
    dateHeure: "",
    destination: "",
    nombreFichiers: 0,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    // Ajouter les autres données du formulaire
    form.append("signePar", formData.signePar);
    form.append("numeroOrdre", formData.numeroOrdre);
    form.append("objet", formData.objet);
    form.append("traitePar", formData.traitePar);
    form.append("dateHeure", formData.dateHeure);
    form.append("destination", formData.destination);
    form.append("nombreFichiers", formData.nombreFichiers);

    // Ajouter le fichier
    form.append("file", formData.file);

    try {
      await creerDepart(form); // Utilise la méthode API pour envoyer le formData
      alert("Départ créé avec succès !");
      navigate("/dashboard"); // Redirection vers la table des départs
    } catch (error) {
      alert("Erreur lors de la création du départ.");
    }
  };

  const handleAddDestination = () => {
    if (!newDestination) {
      alert("La destination ne peut pas être vide.");
      return;
    }

    console.log("Nouvelle destination ajoutée :", newDestination);
    setShowModal(false);  // Fermer le modal après ajout
    setNewDestination("");  // Réinitialiser le champ de destination
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md my-10">
        <div className="text-lg font-semibold mb-6 flex items-center gap-2 bg-blue-500 text-white p-2 rounded-md">
          <FileText className="w-5 h-5" />
          Créer un Départ
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Signé par *
              </label>
              <select name="signePar" onChange={handleChange} className="w-full px-3 py-1.5 border rounded-md">
                <option value="">-- Sélectionner --</option>
                <option value="option1">Option 1</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Numéro d'ordre *
              </label>
              <input type="text" name="numeroOrdre" onChange={handleChange} className="w-full px-3 py-1.5 border rounded-md" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Objet *
              </label>
              <input type="text" name="objet" onChange={handleChange} className="w-full px-3 py-1.5 border rounded-md" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fichier *
              </label>
              <input type="file" name="file" onChange={handleFileChange} className="w-full px-3 py-1.5 border rounded-md" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Traité par *
              </label>
              <select name="traitePar" onChange={handleChange} className="w-full px-3 py-1.5 border rounded-md">
                <option value="">-- Sélectionner --</option>
                <option value="option1">Option 1</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date & Heure
              </label>
              <input type="datetime-local" name="dateHeure" onChange={handleChange} className="w-full px-3 py-1.5 border rounded-md" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Destination *
              </label>
              <div className="flex gap-2">
                <select name="destination" onChange={handleChange} className="flex-1 px-3 py-1.5 border rounded-md">
                  <option value="">Sélectionner une Destination</option>
                  <option value="dest1">Destination 1</option>
                </select>
                <button type="button" onClick={() => setShowModal(true)} className="px-2 py-2 border rounded-md hover:bg-gray-50">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre de Fichiers *
              </label>
              <input type="number" name="nombreFichiers" onChange={handleChange} className="w-full px-3 py-1.5 border rounded-md" />
            </div>
          </div>

          <div className="mt-6 flex justify-center col-span-2">
            <button type="submit" className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
              Créer
            </button>
          </div>
        </form>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg font-semibold mb-4">Ajouter une nouvelle destination</h3>
              <input type="text" value={newDestination} onChange={(e) => setNewDestination(e.target.value)}
                className="w-full px-3 py-2 border rounded-md mb-4" />
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-md">Annuler</button>
                <button onClick={handleAddDestination} className="px-4 py-2 bg-green-600 text-white rounded-md">Ajouter</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreerDepartForm;

import React, { useState, useEffect } from 'react';

const CreerService = ({ service, onClose, onSave }) => {
  const [nom, setNom] = useState('');
  const [division, setDivision] = useState('');
  
  // Liste des divisions (peut être récupérée dynamiquement depuis une API)
  const divisions = ["Division de la formation", "Division de la recherche scientifique", "Division de système d'information", "Centre STSM"];

  useEffect(() => {
    if (service) {
      setNom(service.nom);
      setDivision(service.division);
    }
  }, [service]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nom || !division) return alert("Veuillez remplir tous les champs.");

    onSave({ id: service?.id, nom, division });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        {service ? 'Modifier Service' : 'Créer Service'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block">Nom du Service:</label>
          <input 
            type="text" 
            className="border p-2 w-full rounded"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label className="block">Division:</label>
          <select 
            className="border p-2 w-full rounded"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            required
          >
            <option value="" disabled>Choisir une division</option>
            {divisions.map((div, index) => (
              <option key={index} value={div}>{div}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 mt-4">
          <button 
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {service ? 'Modifier' : 'Créer'}
          </button>
          <button 
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreerService;

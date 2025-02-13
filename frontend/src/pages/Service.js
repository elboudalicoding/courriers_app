import React, { useState, useEffect } from 'react';
import { ChevronDown, FilePlus, Building2, Users, Edit, Trash2 } from 'lucide-react';
import CreerService from "./CreerService";
import { getAllServices, getService, updateService, deleteService, createService } from '../utils/api';

const Service = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getAllServices();
      setServices(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des services:', error);
    }
  };

  const handleOpenForm = (service = null) => {
    setServiceToEdit(service);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSaveService = async (serviceData) => {
    if (!serviceData) {
      console.error("Erreur : serviceData est indéfini");
      return;
    }

    try {
      if (serviceData.id) {
        await updateService(serviceData.id, serviceData);
      } else {
        await createService(serviceData);
      }
      handleCloseForm();
      fetchServices();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du service:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce service ?")) {
      try {
        await deleteService(id);
      const updatedServices = services.filter(service => service.id !== id);
      console.log("Nouveau tableau des services :", updatedServices);
      setServices([...updatedServices]);
      } catch (error) {
        console.error("Erreur lors de la suppression du service:", error);
      }
    }
  };

  const filteredServices = services.filter(service =>
    service.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.division.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleOpenForm(null)}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Créer Service
        </button>
        <input
          type="text"
          placeholder="Rechercher..."
          className="border p-1 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <CreerService 
              service={serviceToEdit} 
              onClose={handleCloseForm} 
              onSave={handleSaveService}
            />
          </div>
        </div>
      )}
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="border p-2">#ID</th>
            <th className="border p-2">Nom du Service</th>
            <th className="border p-2">Division</th>
            <th className="border p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((service, index) => (
            <tr key={service.id} className={index % 2 === 1 ? 'bg-gray-50' : ''}>
              <td className="border p-2">{service.id}</td>
              <td className="border p-2">{service.nom}</td>
              <td className="border p-2">{service.division}</td>
              <td className="border p-2 flex justify-center gap-2">
                <button 
                  onClick={() => handleOpenForm(service)}
                  className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                  title="Modifier"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(service.id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  title="Supprimer"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Service;

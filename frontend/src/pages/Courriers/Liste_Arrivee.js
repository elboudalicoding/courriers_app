import React,{ useState, useEffect }from "react";
import { Eye, X, Calendar, User, FileText, SortAsc, Settings } from 'lucide-react';
import {  fetchCourriersArrivee} from "../../utils/api";
const TableArrivees = ({ id })=> {
  const [courrier, setCourrier] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
        const getCourrierDetails = async () => {
          try {
            const data = await fetchCourriersArrivee(id);
           
            setCourrier(data);
          } catch (error) {
            setError(error.message);
          }
        };
    
        getCourrierDetails();
      }, [id]);

  return (
    <div className="w-full bg-white rounded-lg shadow">
      <div className="bg-[#1e3a8a] text-white p-4 rounded-t-lg">
        <h2 className="text-lg font-semibold">Liste des Arrivées</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 text-left font-medium text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>Date</span>
                </div>
              </th>
              <th className="p-4 text-left font-medium text-gray-600 border-l">
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span>Expéditeur</span>
                </div>
              </th>
              <th className="p-4 text-left font-medium text-gray-600 border-l">
                <div className="flex items-center space-x-2">
                  <FileText size={16} />
                  <span>Objet</span>
                </div>
              </th>
              <th className="p-4 text-left font-medium text-gray-600 border-l">
                <div className="flex items-center space-x-2">
                  <SortAsc size={16} />
                  <span>Traiter par</span>
                </div>
              </th>
              <th className="p-4 text-left font-medium text-gray-600 border-l">
                <div className="flex items-center space-x-2">
                  <Settings size={16} />
                  <span>Actions</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {courrier.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4">{item.date_arrivee}</td>
                <td className="p-4 border-l">{item.entite_origine}</td>
                <td className="p-4 border-l">{item.objet}</td>
                <td className="p-4 border-l">{item.traiterPar}</td>
                <td className="p-4 border-l">
                  <div className="flex space-x-2">
                    <button className="px-2 py-1 bg-cyan-500 text-white rounded hover:bg-cyan-600">
                      <div className="flex items-center space-x-1">
                        <Eye size={16} />
                        <span className="border-l border-white/40 pl-1">Voir</span>
                      </div>
                    </button>
                    <button className="px-2 py-1 bg-amber-500 text-white rounded hover:bg-amber-600">
                      <div className="flex items-center space-x-1">
                        <X size={16} />
                        <span className="border-l border-white/40 pl-1">Supprimer</span>
                      </div>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
    </div>
  );
};

export default TableArrivees;
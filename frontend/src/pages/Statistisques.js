import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchCourriersAD } from '../utils/api';

const Statistiques = ({ onNavClick }) => {
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const processMonthlyData = (data) => {
    const monthlyStats = data.reduce((acc, curr) => {
      const month = curr.date.substring(0, 7);
      if (!acc[month]) {
        acc[month] = { date: month, arrivees: 0, departs: 0 };
      }
      acc[month].arrivees += curr.arrivees;
      acc[month].departs += curr.departs;
      return acc;
    }, {});
    return Object.values(monthlyStats);
  };

  const fetchData = async () => {
    try {
      const response = await fetchCourriersAD();
      if (Array.isArray(response) && response.length > 0) {
        setDailyData(response.slice(-10));
        setMonthlyData(processMonthlyData(response));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center p-6">
      <p className="text-gray-600">Chargement des données...</p>
    </div>
  );

  if (error) return (
    <div className="p-6 text-red-600">
      <p>Erreur : {error}</p>
    </div>
  );

  if (!dailyData.length) return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📊 Statistiques des Arrivées et Départs</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-600">Aucune donnée disponible</p>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">📊 Statistiques des Arrivées et Départs</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Statistiques Mensuelles</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="date" stroke="#888888" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="arrivees" fill="#82ca9d" name="Arrivées" />
              <Bar dataKey="departs" fill="#ffc658" name="Départs" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">10 Derniers Jours</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <XAxis dataKey="date" stroke="#888888" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="arrivees" fill="#82ca9d" name="Arrivées" />
              <Bar dataKey="departs" fill="#ffc658" name="Départs" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistiques;
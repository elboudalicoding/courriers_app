import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchCourriersAD } from '../utils/api';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Initialisation des polices par défaut
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Ajouter la police Roboto-Medium en base64
pdfMake.vfs["Roboto-Medium.ttf"] = "<CONTENU_BASE64_DE_LA_POLICE>"; // Remplace par le contenu base64 de la police

const Statistiques = ({ onNavClick }) => {
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour traiter les données mensuelles
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
    return Object.values(monthlyStats).sort((a, b) => a.date.localeCompare(b.date));
  };

  // Fonction pour récupérer les données
  const fetchData = () => {
    setLoading(true);
    setError(null);
    
    fetchCourriersAD()
      .then(response => {
        if (Array.isArray(response) && response.length > 0) {
          const sortedData = response.sort((a, b) => new Date(a.date) - new Date(b.date));
          setDailyData(sortedData.slice(-10));
          setMonthlyData(processMonthlyData(sortedData));
        } else {
          throw new Error('Aucune donnée disponible');
        }
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fonction pour formater les dates
  const formatDate = (date) => new Date(date).toLocaleDateString('fr-FR');

  // Vérification des états (loading, erreur, pas de données)
  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <p className="text-gray-600">Chargement des données...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600">Erreur : {error}</p>
        <button 
          onClick={fetchData} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (!dailyData.length) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Aucune donnée disponible</p>
        <button 
          onClick={fetchData} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Actualiser
        </button>
      </div>
    );
  }

  // Fonction pour générer le PDF
  const generatePDF = () => {
    const docDefinition = {
      content: [
        { text: 'Statistiques des Arrivées et Départs', style: 'header' },
        {
          table: {
            body: [
              ['Date', 'Arrivées', 'Départs'],
              ...monthlyData.map(item => [item.date, item.arrivees, item.departs]),
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          font: 'Roboto-Medium', // Utilisation de la police Roboto-Medium
        }
      },
      defaultStyle: {
        font: 'Roboto-Medium', // Police par défaut
      }
    };
    pdfMake.createPdf(docDefinition).download('statistiques.pdf');
  };

  // Fonction pour générer le fichier Excel
  const generateExcel = () => {
    const ws = XLSX.utils.json_to_sheet(monthlyData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Statistiques');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { bookType: 'xlsx', type: 'application/octet-stream' });
    saveAs(data, 'statistiques.xlsx');
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">📊 Statistiques des Arrivées et Départs</h2>
      
      <div className="flex gap-4 mb-6">
        <button 
          onClick={generatePDF} 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition-colors"
        >
          📄 Générer PDF
        </button>
        <button 
          onClick={generateExcel} 
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition-colors"
        >
          📊 Générer Excel
        </button>
        <button 
          onClick={fetchData} 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition-colors"
        >
          🔄 Actualiser
        </button>
      </div>

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

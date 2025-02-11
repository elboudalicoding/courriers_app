import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchCourriersAD } from '../utils/api';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Tentative d'initialisation de pdfMake et gestion des erreurs
let pdfInitialized = false;
try {
  // Configuration des polices pdfMake (en utilisant Roboto)
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  
  pdfMake.fonts = {
    Roboto: {
      normal: 'Roboto-Regular',
      bold: 'Roboto-Bold',
      italics: 'Roboto-Italic',
      bolditalics: 'Roboto-BoldItalic'
    }
  };
  pdfInitialized = true;
} catch (err) {
  console.error('Erreur d\'initialisation de pdfMake:', err);
  pdfInitialized = false;
}

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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR');
  };

  const generatePDF = () => {
    try {
      if (!pdfInitialized) {
        alert('Erreur d\'initialisation de pdfMake. Le PDF ne peut pas être généré.');
        return;
      }
      const docDefinition = {
        content: [
          { text: '📊 Rapport Statistiques', style: 'header' },
          { text: '\nStatistiques Mensuelles', style: 'subheader' },
          {
            table: {
              headerRows: 1,
              widths: ['*', '*', '*'],
              body: [
                [{ text: 'Date', style: 'tableHeader' }, 
                 { text: 'Arrivées', style: 'tableHeader' }, 
                 { text: 'Départs', style: 'tableHeader' }],
                ...monthlyData.map(row => [
                  row.date,
                  row.arrivees.toString(),
                  row.departs.toString()
                ])
              ]
            },
            layout: 'lightHorizontalLines'
          },
          { text: '\n10 Derniers Jours', style: 'subheader', margin: [0, 20, 0, 10] },
          {
            table: {
              headerRows: 1,
              widths: ['*', '*', '*'],
              body: [
                [{ text: 'Date', style: 'tableHeader' }, 
                 { text: 'Arrivées', style: 'tableHeader' }, 
                 { text: 'Départs', style: 'tableHeader' }],
                ...dailyData.map(row => [
                  formatDate(row.date),
                  row.arrivees.toString(),
                  row.departs.toString()
                ])
              ]
            },
            layout: 'lightHorizontalLines'
          }
        ],
        styles: {
          header: { fontSize: 18, bold: true, font: 'Roboto', alignment: 'center', margin: [0, 0, 0, 20] },
          subheader: { fontSize: 14, bold: true, font: 'Roboto', margin: [0, 10, 0, 5] },
          tableHeader: { bold: true, fillColor: '#f3f4f6', font: 'Roboto' }
        },
        defaultStyle: {
          fontSize: 10
        }
      };

      pdfMake.createPdf(docDefinition).download('Statistiques.pdf');
    } catch (err) {
      console.error('Erreur lors de la génération du PDF:', err);
      alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
    }
  };

  const generateExcel = () => {
    try {
      const ws = XLSX.utils.json_to_sheet(monthlyData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Statistiques');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(data, 'statistiques.xlsx');
    } catch (err) {
      console.error('Erreur lors de la génération Excel:', err);
      alert('Erreur lors de la génération Excel. Veuillez réessayer.');
    }
  };

  if (loading) {
    return <div className="p-6">Chargement...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Erreur: {error}</div>;
  }

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

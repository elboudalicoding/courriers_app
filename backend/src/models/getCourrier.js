const db = require("../config/dbConfig");

class Courrier {
  static async getCourriers() {
    const query = `
      SELECT DATE_FORMAT(date_arrivee, '%Y-%m-%d') AS date, COUNT(*) AS arrivees, 0 AS departs
      FROM courriers_arrives
      WHERE date_arrivee >= DATE(NOW()) - INTERVAL 10 DAY
      GROUP BY DATE(date_arrivee)
      
      UNION ALL
      
      SELECT DATE_FORMAT(dateHeure, '%Y-%m-%d') AS date, 0 AS arrivees, COUNT(*) AS departs
      FROM depart
      WHERE dateHeure >= DATE(NOW()) - INTERVAL 10 DAY
      GROUP BY DATE(dateHeure)
    `;

    try {
      const [rows] = await db.execute(query);

      // Fusionner les résultats pour éviter des entrées séparées par date
      const resultMap = {};
      rows.forEach(({ date, arrivees, departs }) => {
        if (!resultMap[date]) {
          resultMap[date] = { date, arrivees: 0, departs: 0 };
        }
        resultMap[date].arrivees += arrivees;
        resultMap[date].departs += departs;
      });

      const result = Object.values(resultMap).sort((a, b) => new Date(a.date) - new Date(b.date));

      console.log("Résultats :", result);
      return result;
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des courriers:", error);
      throw new Error("Erreur de base de données");
    }
  }
}

module.exports = Courrier;

const db = require("../config/dbConfig");

class CourrierDepart {
  static async createCourrierDepart(data) {
    const query = `
      INSERT INTO depart (signePar,	numeroOrdre,	objet,		
      traitePar,	dateHeure,	destination,	nombreFichiers, fichier,file_name, file_mime_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
      data.signePar,
      data.numeroOrdre,
      data.objet,
     
      data.traitePar,
      data.dateHeure,
      data.destination,
      data.nombreFichiers,
      data.file,
      data.file_name,
      data.file_mime_type,
      
    ];

    try {
      console.log("🔍 Données reçues :", data); 
      const [result] = await db.execute(query, values); // Execute query using the pool
      return { id: result.insertId, ...data }; // Return the new courrier with its ID
    } catch (error) {
      console.error("❌ Error inserting courrier:", error);
      throw new Error("Database error");
    }
  }

  static async getCourriers() {
    const query = `SELECT * FROM depart`;
    try {
      const [rows] = await db.execute(query);
      return rows;
    } catch (error) {
      console.error("❌ Error fetching courriers:", error);
      throw new Error("Database error");
    }
  }
  //download file
  static async getFileById(id) {
    const query = `SELECT fichier, file_name, file_mime_type FROM depart WHERE id = ?`;
    try {
      const [rows] = await db.execute(query, [id]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      console.error("❌ Error fetching file:", error);
      throw new Error("Database error");
    }
  }
  //courrier 
  static async getCourrierById(id) {
    const query = `SELECT * FROM depart WHERE id = ?`;
    try {
      const [rows] = await db.execute(query, [id]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      console.error("❌ Error fetching courrier:", error);
      throw new Error("Database error");
    }
  }

  //Recherche
static async getCourriersCherchees(filtres) {
  const { dateDebut, dateFin, expediteur, objet } = filtres;

// S'assurer que dateDebut et dateFin existent
const dateDebutValue = dateDebut || '1900-01-01'; 
const dateFinValue = dateFin || '2100-12-31';

// Préparer les valeurs facultatives (NULL si non définies)
const expediteurValue = expediteur || null;
const objetValue = objet?.$regex ? `%${objet.$regex}%` : null;

// Nouvelle requête SQL
const query = `
SELECT * FROM depart
WHERE 
  dateHeure BETWEEN ? AND ?
  OR (
    (? IS NULL OR destination = ?) 
    OR 
    (? IS NULL OR objet LIKE ?)
  )
`;

try {
const [rows] = await db.execute(query, [
  dateDebutValue,
  dateFinValue,
  expediteurValue, expediteurValue, // Vérifie l’expéditeur
  objetValue, objetValue // Vérifie l’objet
]);

console.log("Résultats :", rows);
return rows;
} catch (error) {
console.error("❌ Erreur lors de la récupération des courriers:", error);
throw new Error("Erreur de base de données");
}

}
}
module.exports = CourrierDepart;

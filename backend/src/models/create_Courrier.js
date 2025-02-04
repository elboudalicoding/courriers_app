const db = require("../config/dbConfig");

class Courrier {
  static async createCourrier(data) {
    const query = `
      INSERT INTO courriers_arrives (
        date_arrivee, id_annee, date_origine, numero_origine, entite_origine, objet, 
        nombre_pieces_jointes, type_support, type_courrier, file, file_name, file_mime_type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
      data.date_arrivee,
      data.id_annee,
      data.date_origine,
      data.num_origine,
      data.expediteur,
      data.objet,
      data.nb_pieces_jointes,
      data.type_support,
      data.type_courrier,
      data.file,
      data.file_name,
      data.file_mime_type,
    ];

    try {
      const [result] = await db.execute(query, values); // Execute query using the pool
      return { id: result.insertId, ...data }; // Return the new courrier with its ID
    } catch (error) {
      console.error("❌ Error inserting courrier:", error);
      throw new Error("Database error");
    }
  }
  static async getCourriers() {
    const query = `SELECT * FROM courriers_arrives`;
    try {
      const [rows] = await db.execute(query);
      return rows;
    } catch (error) {
      console.error("❌ Error fetching courriers:", error);
      throw new Error("Database error");
    }
  }
  static async getCourriersArrivee() {
    const query = `SELECT date_arrivee, entite_origine,objet FROM courriers_arrives`;
    try {
      const [rows] = await db.execute(query);
      return rows;
    } catch (error) {
      console.error("❌ Error fetching courriers:", error);
      throw new Error("Database error");
    }
  }
  static async getFileById(id) {
    const query = `SELECT file, file_name, file_mime_type FROM courriers_arrives WHERE id = ?`;
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
  static async getCourrierById(id) {
    const query = `SELECT * FROM courriers_arrives WHERE id = ?`;
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
  SELECT * FROM courriers_arrives
  WHERE 
    date_arrivee BETWEEN ? AND ?
    OR (
      (? IS NULL OR entite_origine = ?) 
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

module.exports = Courrier;

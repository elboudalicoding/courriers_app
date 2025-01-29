const db = require("../config/dbConfig");

class Courrier {
  static async createCourrier(data) {
    const query = `
      INSERT INTO courriers_arrives (
        date_arrivee, id_annee, date_origine, numero_origine, entite_origine, objet, 
        nombre_pieces_jointes, type_support, type_courrier, file
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
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
    ];

    try {
      const [result] = await db.execute(query, values); // Execute query using the pool
      return { id: result.insertId, ...data }; // Return the new courrier with its ID
    } catch (error) {
      console.error("❌ Error inserting courrier:", error);
      throw new Error("Database error");
    }
  }
}

module.exports = Courrier;

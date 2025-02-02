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
}

module.exports = CourrierDepart;

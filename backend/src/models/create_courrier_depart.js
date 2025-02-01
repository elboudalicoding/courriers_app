const db = require("../config/dbConfig");

class CourrierDepart {
  static async createCourrierDepart(data) {
    const query = `
      INSERT INTO depart (signePar,	numeroOrdre,	objet,	fichier,	
      traitePar,	dateHeure,	destination,	nombreFichiers) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
      data.signePar,
      data.numeroOrdre,
      data.objet,
      data.file,
      data.traitePar,
      data.dateHeure,
      data.destination,
      data.nombreFichiers,
      
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

module.exports = CourrierDepart;

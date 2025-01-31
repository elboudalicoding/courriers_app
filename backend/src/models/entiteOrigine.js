const db = require("../config/dbConfig");

class EntiteOrigine {
  static async createEntiteOrigine(data) {
    const query = `
      INSERT INTO entites_origine (nom, ville, contact, fax, adresse)
      VALUES (?, ?, ?, ?, ?);
    `;

    const values = [data.nom, data.ville, data.contact, data.fax, data.adresse];

    try {
      const [result] = await db.execute(query, values);
      return { id: result.insertId, ...data };
    } catch (error) {
      console.error("❌ Error inserting entite origine:", error);
      throw new Error("Database error");
    }
  }

  static async getEntitesOrigine() {
    const query = `SELECT * FROM entites_origine`;
    try {
      const [rows] = await db.execute(query);
      return rows;
    } catch (error) {
      console.error("❌ Error fetching entites origine:", error);
      throw new Error("Database error");
    }
  }
  static async getExpediteurNames() {
    const query = `SELECT nom FROM entites_origine`;
    try {
      const [rows] = await db.execute(query);
      return rows;
    } catch (error) {
      console.error("❌ Error fetching expediteur names:", error);
      throw new Error("Database error");
    }
  }
}

module.exports = EntiteOrigine;

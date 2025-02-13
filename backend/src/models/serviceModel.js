const db = require("../config/dbConfig");

class Service {
  static async createService(data) {
    const query = `
      INSERT INTO service(nom, division)
      VALUES (?, ?)
    `;
    const values = [data.nom, data.division];
   // console.log(values);
    try {
      const [result] = await db.execute(query, values);
      return { id: result.insertId, ...data };
    } catch (error) {
      console.error("❌ Error creating service:", error);
      throw new Error("Database error");
    }
  }

  static async getServices() {
    const query = `SELECT * FROM service`;
    try {
      const [rows] = await db.execute(query); // ! what exactly [rows] contains
      return rows;
    } catch (error) {
      console.error("❌ Error fetching service:", error);
      throw new Error("Database error");
    }
  }
  static async deleteService(id) {
    const query = `DELETE FROM service WHERE id = ?`;
    try {
      await db.execute(query, [id]);
    } catch (error) {
      console.error("❌ Error deleting service:", error);
      throw new Error("Database error");
    }
  }
  static async updateService(id, data) {
    const query = `
      UPDATE service
      SET nom = ?, division = ?
      WHERE id = ?
    `;
    const values = [
      data.nom,
     
      data.division,
      id,
    ];
    try {
      await db.execute(query, values);
      return { id, ...data };
    } catch (error) {
      console.error("❌ Error updating service:", error);
      throw new Error("Database error");
    }
  }
  
}

module.exports = Service;

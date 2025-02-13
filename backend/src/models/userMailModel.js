const db = require("../config/dbConfig");

class UserMail {
  static async createMail(data) {
    const query = `
      INSERT INTO user_mails (user_id, note, courrier_id)
      VALUES (?, ?, ?)
    `;
    const values = [data.userId, data.note, data.courrierId];
    try {
      const [result] = await db.execute(query, values);
      return { id: result.insertId, ...data };
    } catch (error) {
      console.error("❌ Error creating mail:", error);
      throw new Error("Database error");
    }
  }

  static async getMailsByUserId(userId) {
    const query = `
      SELECT um.id, um.note, ca.*
      FROM user_mails um
      JOIN courriers_arrives ca ON um.courrier_id = ca.id
      WHERE um.user_id = ?
    `;
    try {
      const [rows] = await db.execute(query, [userId]);
      return rows;
    } catch (error) {
      console.error("❌ Error fetching mails:", error);
      throw new Error("Database error");
    }
  }
}

module.exports = UserMail;

const db = require("../config/dbConfig");

class UserMail {
  static async createMail(data) {
    const query = `
      INSERT INTO user_mails (user_id, note)
      VALUES (?, ?)
    `;
    const values = [data.userId, data.note];
    try {
      const [result] = await db.execute(query, values);
      return { id: result.insertId, ...data };
    } catch (error) {
      console.error("❌ Error creating mail:", error);
      throw new Error("Database error");
    }
  }

  static async getMailsByUserId(userId) {
    const query = `SELECT id, note FROM user_mails WHERE user_id = ?`;
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

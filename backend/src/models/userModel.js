const db = require("../config/dbConfig");

class User {
  static async getAllUsers() {
    const query = `SELECT id, nom, email, role, service, code FROM users`;
    try {
      const [rows] = await db.execute(query); // ! what exactly [rows] contains
      return rows;
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      throw new Error("Database error");
    }
  }
  static async createUser(data) {
    const query = `
      INSERT INTO users (nom, email, role, service, code, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.nom,
      data.email,
      data.role,
      data.service,
      data.code,
      data.password,
    ];
    try {
      const [result] = await db.execute(query, values);
      return { id: result.insertId, ...data };
    } catch (error) {
      console.error("❌ Error creating user:", error);
      throw new Error("Database error");
    }
  }
  static async deleteUser(id) {
    const query = `DELETE FROM users WHERE id = ?`;
    try {
      await db.execute(query, [id]);
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      throw new Error("Database error");
    }
  }
  static async updateUser(id, data) {
    const query = `
      UPDATE users
      SET nom = ?, email = ?, role = ?, service = ?, code = ?
      WHERE id = ?
    `;
    const values = [
      data.nom,
      data.email,
      data.role,
      data.service,
      data.code,
      id,
    ];
    try {
      await db.execute(query, values);
      return { id, ...data };
    } catch (error) {
      console.error("❌ Error updating user:", error);
      throw new Error("Database error");
    }
  }
  static async getAllUserNames() {
    const query = `SELECT id, nom FROM users`;
    try {
      const [rows] = await db.execute(query);
      return rows;
    } catch (error) {
      console.error("❌ Error fetching user names:", error);
      throw new Error("Database error");
    }
  }
  static async findByUsername(username) {
    const query = `SELECT id, nom, email FROM users WHERE nom = ?`;
    try {
      const [rows] = await db.execute(query, [username]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      console.error("❌ Error fetching user by username:", error);
      throw new Error("Database error");
    }
  }
  //fetching user by email and password 
  static async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = ?";
    try {
      const [rows] = await db.execute(query, [email]);
      return rows[0];
    } catch (error) {
      console.error("❌ Error fetching user by email:", error);
      throw new Error("Database error");
    }
  }
}


module.exports = User;

//pour centraliser la connexion à la base de données.
const mysql = require("mysql");
const process = require("process");
// Configure the database connection
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the MySQL database!");
});

db.on("error", (err) => {
  console.error("Database connection error:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.log("Reconnecting to the database...");
    db.connect(); // Reconnect on connection loss
  } else {
    throw err;
  }
});

module.exports = db;

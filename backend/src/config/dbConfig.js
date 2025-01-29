const mysql = require("mysql2/promise"); // Use the promise wrapper
require("dotenv").config();
const process = require("process");

// Configure the database connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = db;

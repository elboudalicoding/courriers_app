const mysql = require("mysql");

// Configure the database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "courriersapp",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the MySQL database!");
});

module.exports = db;

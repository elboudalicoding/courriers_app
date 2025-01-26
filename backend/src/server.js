const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

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

// Define the signup route
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  // Check if all required fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const userType = "justUser";
  const sql =
    "INSERT INTO signup (`username`, `email`, `password`, `userType`) VALUES (?, ?, ?, ?)";
  const values = [username, email, password, userType];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).json({ error: "Failed to insert user data." });
    }
    return res
      .status(201)
      .json({ message: "User registered successfully!", data: result });
  });
});

// Start the server
app.listen(3001, () => {
  console.log("Server started on port 3001");
});

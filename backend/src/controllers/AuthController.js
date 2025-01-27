const db = require("../config/dbConfig");

const signup = (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
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
};

module.exports = { signup };

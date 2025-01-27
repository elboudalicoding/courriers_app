//pour gérer la logique métier liée à l'authentification.
const db = require("../config/dbConfig");

const bcrypt = require("bcryptjs");
const validateEmail = require("validator").isEmail; // Utilisation de validator pour valider l'email.

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  const userType = "justUser";
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hashage du mot de passe

    const sql =
      "INSERT INTO signup (`username`, `email`, `password`, `userType`) VALUES (?, ?, ?, ?)";
    const values = [username, email, hashedPassword, userType];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error executing query:", err.message);
        return res.status(500).json({ error: "Failed to insert user data." });
      }
      return res
        .status(201)
        .json({ message: "User registered successfully!", data: result });
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.signup = signup;

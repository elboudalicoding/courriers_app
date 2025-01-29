//pour gérer la logique métier liée à l'authentification.
const db = require("../config/dbConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateEmail = require("validator").isEmail; // Utilisation de validator pour valider l'email.
const process = require("process");

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
// Fonction login pour l'authentification
const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login request received:", { email }); // Log incoming request

  // Validate input
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Both email and password are required." });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  try {
    // Chercher l'utilisateur par email
    const sql = "SELECT * FROM signup WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
      if (err) {
        console.error("Error executing query:", err.message);
        return res.status(500).json({ error: "Database error." });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "User not found." });
      }

      const user = results[0];

      // Comparer le mot de passe avec le hash en base
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password..." });
      }

      // Générer un token JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      console.log("Login successful, token generated:", token); // Log token
      return res.status(200).json({
        message: "Login successful",
        token: token,
        user: { id: user.id, username: user.username, email: user.email },
      });
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error .." });
  }
};

exports.signup = signup;
exports.login = login;

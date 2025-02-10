const validateEmail = require("validator").isEmail; // Utilisation de validator pour valider l'email.
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const process = require("process");

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key_here";

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
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Vérifier le mot de passe sans hashing
    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { login };

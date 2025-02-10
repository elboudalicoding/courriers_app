const express = require("express");
const { login } = require("../controllers/AuthController");

const router = express.Router();

// Define the signup route
router.post("/login", login);

module.exports = router;

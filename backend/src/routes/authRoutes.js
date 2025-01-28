const express = require("express");
const { signup } = require("../controllers/AuthController");
const { login } = require("../controllers/AuthController");

const router = express.Router();

// Define the signup route
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;

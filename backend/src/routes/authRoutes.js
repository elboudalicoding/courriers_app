const express = require("express");
const { signup } = require("../controllers/AuthController");

const router = express.Router();

// Define the signup route
router.post("/signup", signup);

module.exports = router;

const express = require("express");
const router = express.Router();
const { createCourrier } = require("../controllers/courrierController");

router.post("/", createCourrier);

module.exports = router;

const express = require("express");
const router = express.Router();
const { createCourrierDepart } = require("../controllers/courrierControllerDepart");

router.post("/", createCourrierDepart);

module.exports = router;

const express = require("express");
const router = express.Router();
const { createCourrierDepart ,getCourriers} = require("../controllers/courrierControllerDepart");

router.post("/", createCourrierDepart);
router.get("/", getCourriers);
module.exports = router;

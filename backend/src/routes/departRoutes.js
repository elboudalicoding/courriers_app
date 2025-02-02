const express = require("express");
const router = express.Router();
const { createCourrierDepart ,getCourriers,downloadFile,getCourrierById} = require("../controllers/courrierControllerDepart");

router.post("/", createCourrierDepart);
router.get("/", getCourriers);
router.get("/download/:id", downloadFile);
router.get("/:id", getCourrierById);
module.exports = router;

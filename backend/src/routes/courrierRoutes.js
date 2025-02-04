const express = require("express");
const router = express.Router();
const {
  createCourrier,
  getCourriers,
  downloadFile,
  getCourrierById,
  getCourriersArrivee,
  getCourriersCherchees
} = require("../controllers/courrierController");

router.post("/", createCourrier);
router.get("/", getCourriers);
router.get("/arrivee", getCourriersArrivee);
router.get("/download/:id", downloadFile);
router.get("/search",getCourriersCherchees);
router.get("/:id", getCourrierById);

module.exports = router;

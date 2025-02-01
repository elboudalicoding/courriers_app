const express = require("express");
const router = express.Router();
const {
  createCourrier,
  getCourriers,
  downloadFile,
  getCourrierById,
} = require("../controllers/courrierController");

router.post("/", createCourrier);
router.get("/", getCourriers);
router.get("/download/:id", downloadFile);
router.get("/:id", getCourrierById);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createCourrier,
  getCourriers,
  downloadFile,
} = require("../controllers/courrierController");

router.post("/", createCourrier);

router.get("/", getCourriers);
router.get("/download/:id", downloadFile);

module.exports = router;

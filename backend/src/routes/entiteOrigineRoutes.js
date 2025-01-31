const express = require("express");
const router = express.Router();
const {
  createEntiteOrigine,
  getEntitesOrigine,
  getExpediteurNames,
} = require("../controllers/entiteOrigineController");

router.post("/", createEntiteOrigine);
router.get("/", getEntitesOrigine);
router.get("/expediteurs", getExpediteurNames);

module.exports = router;

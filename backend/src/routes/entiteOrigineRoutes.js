const express = require("express");
const router = express.Router();
const {
  createEntiteOrigine,
  getEntitesOrigine,
  getExpediteurNames,
  updateEntiteOrigine
} = require("../controllers/entiteOrigineController");

router.post("/", createEntiteOrigine);
router.get("/", getEntitesOrigine);
router.get("/expediteurs", getExpediteurNames);
router.put("/:id", updateEntiteOrigine);

module.exports = router;

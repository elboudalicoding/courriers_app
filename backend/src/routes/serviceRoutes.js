const express = require("express");
const router = express.Router();
const { createService,getServices,deleteService,updateService} = require("../controllers/serviceController");

router.get("/", getServices);
router.post("/", createService);
router.delete("/:id", deleteService);
router.put("/:id", updateService);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
 
  getCourriers
} = require("../controllers/courrController");


router.get("/", getCourriers);

module.exports = router;

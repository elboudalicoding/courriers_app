const express = require("express");
const router = express.Router();
const { sendMail, getUserMails } = require("../controllers/userMailController");

router.post("/send",sendMail);
router.get("/:userId", getUserMails);

module.exports = router;
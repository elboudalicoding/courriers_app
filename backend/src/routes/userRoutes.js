const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserNames,
} = require("../controllers/userController");
// const { verifySuperAdmin } = require("../middlewares/authMiddleware");
// const { authenticateUser } = require("../middlewares/authMiddleware");

router.get("/users", getUsers);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);
router.get("/usernames", getUserNames);

module.exports = router;

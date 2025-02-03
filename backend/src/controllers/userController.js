const User = require("../models/userModel");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json(users); // ! WARNING  what is the role exactly of this line 
  } catch (error) {
    console.error("❌ Error fetching users:", error.message);
    res.status(500).json({ message: "Error fetching users" });
  }
};
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("❌ Error creating user:", error.message);
    res.status(500).json({ message: "Error creating user" });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    await User.deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("❌ Error deleting user:", error.message);
    res.status(500).json({ message: "Error deleting user" });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("❌ Error updating user:", error.message);
    res.status(500).json({ message: "Error updating user" });
  }
};
exports.getUserNames = async (req, res) => {
  try {
    const users = await User.getAllUserNames();
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error fetching user names:", error.message);
    res.status(500).json({ message: "Error fetching user names" });
  }
};
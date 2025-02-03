const express = require("express");
const cors = require("cors");
const multer = require("multer");
const authRoutes = require("./routes/authRoutes");
const courrierRoutes = require("./routes/courrierRoutes");
const departRoutes = require("./routes/departRoutes");
const entiteOrigineRoutes = require("./routes/entiteOrigineRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");
const userMailRoutes = require("./routes/userMailRoutes");

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// Mount the routes
app.use("/api/auth", authRoutes);
app.use("/api/courriers", upload.single("file"), courrierRoutes);
app.use("/api/depart", upload.single("file"), departRoutes);
app.use("/api/entites_origine", entiteOrigineRoutes);
app.use("/api", userRoutes); // Add user routes
app.use("/api/mails", userMailRoutes); // Add user mail routes

// Error handler middleware should be used after all routes
app.use(errorHandler);

module.exports = app;

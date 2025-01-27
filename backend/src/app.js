const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Mount the routes
app.use(errorHandler);
app.use("/api/auth", authRoutes);

module.exports = app;

require("dotenv").config(); // Load environment variables from .env file
const process = require("process");
const app = require("./src/app");

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

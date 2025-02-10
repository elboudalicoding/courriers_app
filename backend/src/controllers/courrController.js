const Courrier = require("../models/getCourrier");

exports.getCourriers = async (req, res) => {
    try {
     
      const courriers = await Courrier.getCourriers();
      res.status(200).json(courriers);
    } catch (error) {
      console.error("❌ Error fetching courriers:", error.message);
      res.status(500).json({
        message: "Error fetching courriers in <courrierController.js>",
      });
    }
  };
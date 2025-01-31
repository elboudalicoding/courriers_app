const Courrier = require("../models/create_Courrier");

exports.createCourrier = async (req, res) => {
  try {
    const file = req.file ? req.file.buffer : null;
    const fileName = req.file ? req.file.originalname : null;
    const fileMimeType = req.file ? req.file.mimetype : null;

    const newCourrier = await Courrier.createCourrier({
      ...req.body,
      file,
      file_name: fileName,
      file_mime_type: fileMimeType,
    });

    res.status(201).json({
      message: "Courrier created successfully.",
      courrier: newCourrier,
    });
  } catch (error) {
    console.error("❌ Error in createCourrier:", error.message);
    res.status(500).json({
      message: "Error creating courrier in <courrierController.js>",
    });
  }
};

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

exports.downloadFile = async (req, res) => {
  try {
    const { id } = req.params;
    const fileData = await Courrier.getFileById(id);
    if (!fileData) {
      return res.status(404).json({ message: "File not found" });
    }
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileData.file_name}"`
    );
    res.setHeader("Content-Type", fileData.file_mime_type);
    res.send(fileData.file);
  } catch (error) {
    console.error("❌ Error downloading file:", error.message);
    res.status(500).json({
      message: "Error downloading file in <courrierController.js>",
    });
  }
};

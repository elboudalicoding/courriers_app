const EntiteOrigine = require("../models/entiteOrigine");

exports.createEntiteOrigine = async (req, res) => {
  try {
    const newEntiteOrigine = await EntiteOrigine.createEntiteOrigine(req.body);
    res.status(201).json({
      message: "Entité Origine created successfully.",
      entiteOrigine: newEntiteOrigine,
    });
  } catch (error) {
    console.error("❌ Error in createEntiteOrigine:", error.message);
    res.status(500).json({
      message: "Error creating entité origine in <entiteOrigineController.js>",
    });
  }
};

exports.getEntitesOrigine = async (req, res) => {
  try {
    const entitesOrigine = await EntiteOrigine.getEntitesOrigine();
    res.status(200).json(entitesOrigine);
  } catch (error) {
    console.error("❌ Error fetching entites origine:", error.message);
    res.status(500).json({
      message: "Error fetching entites origine in <entiteOrigineController.js>",
    });
  }
};
exports.getExpediteurNames = async (req, res) => {
  try {
    const expediteurs = await EntiteOrigine.getExpediteurNames();
    res.status(200).json(expediteurs);
  } catch (error) {
    console.error("❌ Error fetching expediteur names:", error.message);
    res.status(500).json({
      message:
        "Error fetching expediteur names in <entiteOrigineController.js>",
    });
  }
};
exports.updateEntiteOrigine = async (req, res) => {
  try {
    const updatedEntiteOrigine = await EntiteOrigine.updateEntiteOrigine(req.params.id, req.body);
    res.status(200).json({
      message: "Entité Origine updated successfully.",
      entiteOrigine: updatedEntiteOrigine,
    });
  } catch (error) {
    console.error("❌ Error in updateEntiteOrigine:", error.message);
    res.status(500).json({
      message: "Error updating entité origine in <entiteOrigineController.js>",
    });
  }
};

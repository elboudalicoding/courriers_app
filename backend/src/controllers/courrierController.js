const Courrier = require("../models/create_Courrier");

exports.createCourrier = async (req, res) => {
  try {
    // Validate request body
    // const {
    //   date_arrivee,
    //   id_annee,
    //   date_origine,
    //   numero_origine,
    //   entite_origine,
    //   objet,
    //   nombre_pieces_jointes,
    //   type_support,
    //   type_courrier,
    // } = req.body;

    // if (
    //   !date_arrivee ||
    //   !id_annee ||
    //   !date_origine ||
    //   !numero_origine ||
    //   !entite_origine ||
    //   !objet ||
    //   !nombre_pieces_jointes ||
    //   !type_support ||
    //   !type_courrier
    // ) {
    //   return res
    //     .status(400)
    //     .json({ message: "All fields are required to create a courrier ." });
    // }
    const file = req.file ? req.file.buffer : null;

    // Call the model to insert the data
    const newCourrier = await Courrier.createCourrier({
      ...req.body,
      file,
    });

    // Return success response
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

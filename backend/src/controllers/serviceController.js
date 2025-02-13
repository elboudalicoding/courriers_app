const Service = require("../models/serviceModel");

exports.createService = async (req, res) => {
  try {
    const newService = await Service.createService(req.body);
    res.status(201).json(newService);
  } catch (error) {
    console.error("❌ Error creating service:", error.message);
    res.status(500).json({ message: "Error creating service" });
  }
};
  exports.getServices = async (req, res) => {
    try {
      const services = await Service.getServices();
      res.status(201).json(services);
    } catch (error) {
      console.error("❌ Error creating service:", error.message);
      res.status(500).json({ message: "Error creating service" });
    }
  };
  exports.deleteService = async (req, res) => {
    try {
      await Service.deleteService(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("❌ Error deleting service:", error.message);
      res.status(500).json({ message: "Error deleting service" });
    }
  };

  exports.updateService = async (req, res) => {
    try {
      const updateService = await Service.updateService(req.params.id, req.body);
      res.status(200).json(updateService);
    } catch (error) {
      console.error("❌ Error updating service:", error.message);
      res.status(500).json({ message: "Error updating service" });
    }
  };
  exports.getServiceById = async (req, res) => {
    try {
      // Utilisation de la méthode de mise à jour et récupération du service mis à jour
      const updatedService = await Service.updateService(req.params.id, req.body);
  
      // Vérifie si un service a été effectivement mis à jour
      if (!updatedService) {
        return res.status(404).json({ message: "Service not found" });
      }
  
      // Retourner le service mis à jour
      res.status(200).json(updatedService);
    } catch (error) {
      console.error("❌ Error updating service:", error.message);
      res.status(500).json({ message: "Error updating service" });
    }
  };
  
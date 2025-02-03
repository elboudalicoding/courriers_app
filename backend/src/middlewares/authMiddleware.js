const verifySuperAdmin = (req, res, next) => {
    if (req.user && req.user.role === "Super Admin") {
      next();
    } else {
      return res.status(403).json({ error: "Accès interdit" });
    }
  };
  
  module.exports = { verifySuperAdmin };
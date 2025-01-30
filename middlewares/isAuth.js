const User = require("../Model/User");
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ errors: [{ msg: "Accès non autorisé" }] });
    }

    const decoded = jwt.verify(token, process.env.SCRT_KEY);
    const foundUser = await User.findById(decoded.id).select("-password");

    if (!foundUser) {
      return res.status(401).json({ errors: [{ msg: "Utilisateur non trouvé" }] });
    }

    req.user = foundUser;
    next();
  } catch (error) {
    return res.status(401).json({ errors: [{ msg: "Token invalide" }] });
  }
};

// Vérification du rôle admin
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Accès refusé, admin uniquement" });
  }
  next();
};

module.exports = { isAuth, isAdmin };

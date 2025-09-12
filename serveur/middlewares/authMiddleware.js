const jwt = require("jsonwebtoken");
const User = require("../models/auth.model.js");

const authentification = async (req, res, next) => {
  const { tokenUser } = req.cookies;
  console.log("tokenUser dans authMiddleware :", tokenUser);

  if (!tokenUser) {
    return res.status(401).json({ message: "Accès interdit" });
  }

  try {
    const decoded = jwt.verify(tokenUser, process.env.SECRET_KEY);
    console.log("Token décodé :", decoded);

    req.user = await User.findById(decoded.sub);
    console.log("Utilisateur authentifié :", req.user);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Accès non autorisé" });
  }
};

module.exports = authentification;

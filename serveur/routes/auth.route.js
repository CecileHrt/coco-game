const router = require("express").Router();
const {
  signupMail,
  signupMdp,
  verifyMail,
  addChildProfile,
  connexion,
  forgotPassword,
  resetPassword,
  stayConnected,
} = require("../controllers/auth.controller.js");
const authentification = require("../middlewares/authMiddleware.js");

// POST
// Inscription
router.post("/", signupMail);
router.post("/finaliser-inscription/:token", signupMdp);
router.post("/creer-profil-enfant", authentification, addChildProfile);
// Connexion
router.post("/connexion", connexion);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
// router.post("/changePassword", changePassword);

// GET
router.get("/verifyMail/:token", verifyMail);
router.get("/isconnected", stayConnected);

module.exports = router;
// localhost:3000/auth

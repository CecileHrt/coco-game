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
  signout,
} = require("../controllers/auth.controller.js");
const authentification = require("../middlewares/authMiddleware.js");
const { loginLimiter } = require("../middlewares/rateLimitMiddleware.js");

// POST
// Inscription
router.post("/", signupMail);
router.post("/finaliser-inscription/:token", signupMdp);
router.post("/creer-profil-enfant", authentification, addChildProfile);
// Connexion
router.post("/connexion", loginLimiter, connexion);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

// GET
router.get("/verifyMail/:token", verifyMail);
router.get("/isconnected", stayConnected);

// DELETE
router.delete("/deleteToken", signout);

module.exports = router;
// localhost:3000/auth

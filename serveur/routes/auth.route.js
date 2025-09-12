const router = require("express").Router();
const {
  signupMail,
  signupMdp,
  verifyMail,
  addChildProfile,
} = require("../controllers/auth.controller.js");
const authentification = require("../middlewares/authMiddleware.js");

router.post("/", signupMail);
router.post("/finaliser-inscription/:token", signupMdp);
router.post("/creer-profil-enfant", authentification, addChildProfile);

router.get("/verifyMail/:token", verifyMail);

// router.post("/", (req, res) => {});

module.exports = router;
// localhost:3000/auth

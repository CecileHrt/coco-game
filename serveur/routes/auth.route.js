const router = require("express").Router();
const {
  signupMail,
  signupMdp,
  verifyMail,
} = require("../controllers/auth.controller.js");

router.post("/", signupMail);
router.post("/finaliser-inscription/:token", signupMdp);

router.get("/verifyMail/:token", verifyMail);

// router.post("/", (req, res) => {});

module.exports = router;
// localhost:3000/auth

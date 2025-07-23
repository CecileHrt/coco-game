const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(201).json("Ceci est une requête get sur la route /auth");
});
router.post("/", (req, res) => {
  res.status(201).json("Ceci est une requête post sur la route /auth");
});

module.exports = router;
// localhost:3000/auth

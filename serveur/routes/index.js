const router = require("express").Router();

// Import des routes
const apiAuth = require("./auth.route");

// Orientation des routes
router.use("/auth", apiAuth);

module.exports = router;
// localhost:3000

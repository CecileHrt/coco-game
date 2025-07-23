const rateLimit = require("express-rate-limit");

// Limite générique : 100 requêtes max par 15 min
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      status: options.statusCode,
      message: "Trop de requêtes. Réessayez plus tard.",
    });
  },
});

// Limite stricte pour le login : 5 tentatives par 15 min
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      status: options.statusCode,
      message:
        "Trop de tentatives de connexion. Réessayez dans quelques minutes.",
    });
  },
});

module.exports = {
  generalLimiter,
  loginLimiter,
};

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { generalLimiter } = require("./middlewares/rateLimitMiddleware");
const config = require("./database/config");

const app = express();
app.use(express.json());
app.use(cookieParser());
// CONDITION pour déployer avec Resend
if (process.env.MODE === "production") {
  app.set("trust proxy", 1);
}

app.use(
  cors({
    origin:
      process.env.MODE === "development"
        ? process.env.CLIENT_URL
        : process.env.DEPLOY_FRONT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);

// test middlewares
// app.use((req, res, next) => {
//   console.log("test mw : ", `${req.method} ${req.path}`);
//   next();
// });

// test routes
// app.post("/", (req, res) => {
//   res.send("Route post ok");
// });

const routes = require("./routes");

app.use(generalLimiter);
app.use(routes);

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(config.mongoDb.uri)
    .then(() => console.log("Connexion Mongo DB OK"))
    .catch((err) => console.log(err));
}

module.exports = app;

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

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
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

mongoose
  .connect(config.mongoDb.uri)
  .then(() => {
    console.log("Connexion Mongo DB OK");
  })
  .catch((err) => console.log(err));

app.listen(3000);

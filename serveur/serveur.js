const app = require("./index");
const mongoose = require("mongoose");
const config = require("./database/config");

mongoose
  .connect(config.mongoDb.uri)
  .then(() => {
    console.log("Connexion Mongo DB OK");
    app.listen(3000, () => console.log("Server started on 3000"));
  })
  .catch((err) => console.log(err));

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    mail: {
      type: String,
      required: [true, "Le mail est requis"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email invalide"],
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est requis"],
      minlength: [8, "Le mot de passe doit contenir au moins 8 caractères"],
    },
    rgpd: {
      type: Boolean,
      required: [true, "Vous devez accepter les termes et conditions"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

// Schéma profils enfants
const childSchema = new mongoose.Schema(
  {
    prenom: {
      type: String,
      required: [true, "Le prénom est requis"],
      //unique: true,
      lowercase: true,
      maxlength: [50, "Le prénom est trop long"],
      minlength: [2, "Le prénom est trop court"],
    },
    anniversaire: {
      type: Date,
      required: [true, "La date de naissance est requise"],
    },
    classe: {
      type: String,
      required: [true, "La classe est requise"],
      enum: ["MS", "GS", "CP", "CE1", "CE2", "CM1", "CM2"],
    },
  },
  {
    timestamps: true,
  }
);

// Schéma utilisateur incluant les profils enfants
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
    child: [childSchema], // relier au schema enfant
  },
  {
    timestamps: true,
  }
);

// Middleware pour hasher le mot de passe avant sauvegarde
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema(
  {
    mail: {
      type: String,
      required: [true, "Le mail est requis"],
      lowercase: true,
      trim: true,
      match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email invalide"],
    },
    token: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
tempUserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 900 }); // 15 minutes expiration

const TempUser = mongoose.model("TempUser", tempUserSchema);

module.exports = TempUser;

const User = require("../models/auth.model.js");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const {
  sendConfirmationEmail,
  sendInvalidEmailToken,
} = require("../mails/optin.js");
const TempUser = require("../models/tempUser.model.js");

const SECRET_KEY = process.env.SECRET_KEY;

const createTokenEmail = (mail) => {
  return jsonwebtoken.sign({ mail }, process.env.SECRET_KEY, {
    expiresIn: "15m",
  });
};

const signupMail = async (req, res) => {
  // console.log(req.body);
  console.log("signupMail called with body:", req.body);
  try {
    const { mail } = req.body;
    const user = await User.findOne({ mail });
    if (user) {
      return res.status(400).json({
        message:
          "Veulliez confirmer votre en inscription en consultant votre boite mail",
      });
    }
    const token = createTokenEmail(mail);
    await sendConfirmationEmail(mail, token);
    // console.log("email de confirmation envoyé à ", mail);
    const tempUser = new TempUser({
      mail,
      token,
    });
    // console.log("sauvegarde de tempUser :", tempUser);
    await tempUser.save();
    res.status(201).json({
      messageOk:
        "Veuillez confirmer votre en inscription en consultant votre boite mail",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue." });
  }
};

const verifyMail = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY);
    const tempUser = await TempUser.findOne({ mail: decoded.mail, token });
    if (!tempUser) {
      return res.redirect(
        `${process.env.CLIENT_URL}/inscription?message=error`
      );
    }
    // // const newUser = new User({
    // //   mail: tempUser.mail,
    // //   // password: tempUser.password,
    // //   // rgpd: tempUser.rgpd,
    // // });
    // // await newUser.save();
    // await TempUser.deleteOne({ mail: tempUser.mail });
    res.redirect(
      `${process.env.CLIENT_URL}/inscription/finaliser-inscription?message=success&token=${token}`
    );
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      const tempUser = await TempUser.findOne({ token });
      if (tempUser) {
        await tempUser.deleteOne({ token });
        await sendInvalidEmailToken(tempUser.mail);
      }
      return res.redirect(
        `${process.env.CLIENT_URL}/inscription?message=error`
      );
    }
    console.log(error);
  }
};

const signupMdp = async (req, res) => {
  // console.log("req.body");
  try {
    const { password, rgpd } = req.body;
    const { token } = req.params;
    const hashPassword = bcrypt.hashSync(password, 10);
    // console.log("token reçu :", token, "et +", req.body);
    const decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY);
    const tempUser = await TempUser.findOne({ mail: decoded.mail });
    const newUser = new User({
      mail: tempUser.mail,
      password: hashPassword,
      rgpd: rgpd,
    });
    await newUser.save();
    await TempUser.deleteOne({ mail: tempUser.mail });
    res.status(201).json({
      message: "Inscription réussie !",
      user: {
        mail: newUser.mail,
        // password: newUser.password, // Do not send password back
        rgpd: newUser.rgpd,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue." });
  }
};

module.exports = { signupMail, signupMdp, verifyMail };

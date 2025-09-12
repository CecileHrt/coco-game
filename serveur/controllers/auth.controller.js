const User = require("../models/auth.model.js");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const {
  sendConfirmationEmail,
  sendAccountAlreadyExistsEmail,
} = require("../mails/optin.js");
const TempUser = require("../models/tempUser.model.js");

const SECRET_KEY = process.env.SECRET_KEY;

// création d'un token pour l'email
const createTokenEmail = (mail) => {
  return jsonwebtoken.sign({ mail }, process.env.SECRET_KEY, {
    expiresIn: "15m",
  });
};

// inscription étape 1 : envoi du mail de confirmation
const signupMail = async (req, res) => {
  // console.log(req.body);
  console.log("signupMail appelée avec", req.body);
  try {
    const { mail } = req.body;
    const user = await User.findOne({ mail });
    if (user) {
      await sendAccountAlreadyExistsEmail(mail);
      console.log("email de redirection envoyé à ", mail);
      return res.status(400).json({
        success: true, // pour éviter d'informer un potentiel attaquant
        message:
          "Veuillez confirmer votre en inscription en consultant votre boite mail",
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
      success: true,
      message:
        "Veuillez confirmer votre en inscription en consultant votre boite mail",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue." });
  }
};

// inscription étape 2 : vérification du token dans le mail
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
      }
      return res.redirect(
        `${process.env.CLIENT_URL}/inscription?message=invalid-token`
      );
    }
    console.log(error);
  }
};

// inscription étape 3 : choix du mot de passe
const signupMdp = async (req, res) => {
  //console.log("signupMdp appelée avec", req.body);
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
    // token et cookie de session
    const tokenUser = jsonwebtoken.sign({}, SECRET_KEY, {
      subject: newUser._id.toString(),
      expiresIn: "7d",
      algorithm: "HS256",
    });
    res.cookie("tokenUser", tokenUser, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Inscription réussie !",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue." });
  }
};

// ajout d'un profil enfant
const addChildProfile = async (req, res) => {
  // console.log("Nouvel enfant reçu :", req.body);
  const { prenom, anniversaire, classe } = req.body;
  try {
    const adult = await User.findById(req.user._id);
    adult.child.push({ prenom, anniversaire, classe });
    await adult.save();
    // if (!user) {
    //   return res.status(404).json({ message: "Utilisateur introuvable" });
    // }
    // console.log("Utilisateur trouvé :", adult);
    res.json({ message: "Enfant reçu", child: adult });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue." });
  }
};

module.exports = { signupMail, signupMdp, verifyMail, addChildProfile };

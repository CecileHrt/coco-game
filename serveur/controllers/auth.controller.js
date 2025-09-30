const User = require("../models/auth.model.js");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const {
  sendConfirmationEmail,
  sendAccountAlreadyExistsEmail,
  sendForgotPasswordEmail,
  validateNewPassword,
} = require("../mails/optin.js");
const TempUser = require("../models/tempUser.model.js");

const SECRET_KEY = process.env.SECRET_KEY;

// -- -- -- -- -- -- --
// Inscription
// -- -- -- -- -- -- --

// création d'un token pour l'email
const createTokenEmail = (mail) => {
  return jsonwebtoken.sign({ mail }, process.env.SECRET_KEY, {
    expiresIn: "15m",
  });
};

// inscription étape 1 : envoi du mail de confirmation
const signupMail = async (req, res) => {
  // console.log("signupMail appelée avec", req.body);
  try {
    const { mail } = req.body;
    const user = await User.findOne({ mail });
    if (user) {
      await sendAccountAlreadyExistsEmail(mail);
      // console.log("email de réinitialisation envoyé à ", mail);
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
    // console.log("token req.params :", req.params.token);
    const decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY);
    // console.log("token décodé :", decoded);
    const tempUser = await TempUser.findOne({ mail: decoded.mail });
    // console.log("tempUser trouvé :", tempUser);
    const newUser = new User({
      mail: tempUser.mail,
      password: hashPassword,
      rgpd: rgpd,
    });
    await newUser.save();
    await TempUser.deleteOne({ mail: tempUser.mail });
    // console.log("Nouvel utilisateur créé :", newUser);
    // token et cookie de session
    const tokenUser = jsonwebtoken.sign({}, SECRET_KEY, {
      subject: newUser._id.toString(),
      expiresIn: "7d",
      algorithm: "HS256",
    });
    res.cookie("tokenUser", tokenUser, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
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
  console.log("Nouvel enfant reçu :", req.body);
  const { prenom, anniversaire, classe, accParental } = req.body;
  try {
    const adult = await User.findById(req.user._id);
    const prenomExiste = adult.childList.some(
      (child) => child.prenom.toLowerCase() === prenom.toLowerCase()
    );

    if (prenomExiste) {
      return res.status(400).json({ message: "Ce prénom est déjà utilisé." });
    }
    //console.log("prénom unique :", prenomExiste);

    adult.childList.push({ prenom, anniversaire, classe, accParental });
    await adult.save();
    // console.log("Utilisateur trouvé :", adult);
    res.status(201).json({ message: "Enfant reçu", user: adult });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue." });
  }
};

// -- -- -- -- -- -- --
// Connexion Déconnexion
// -- -- -- -- -- -- --

//  Connexion
const connexion = async (req, res) => {
  try {
    const { mail, password } = req.body;
    // console.log("login appelée avec", req.body);
    const user = await User.findOne({ mail });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email et/ou mot de passe incorrect" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res
        .status(400)
        .json({ message: "Email et/ou mot de passe incorrect" });
    }
    const { password: _, ...userWithoutPassword } = user.toObject();
    const tokenUser = jsonwebtoken.sign({}, SECRET_KEY, {
      subject: user._id.toString(),
      expiresIn: "7d",
      algorithm: "HS256",
    });

    res.cookie("tokenUser", tokenUser, {
      httpOnly: true,
      secure: false, // à passer à true en production avec HTTPS
      sameSite: "Lax", // autorise la traversée des url
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ user: userWithoutPassword, message: "Connexion réussie !" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue." });
  }
};

// Mot de passe oublié 1 : envoyer le lien de réinitialisation
const forgotPassword = async (req, res) => {
  const { mail } = req.body;
  // console.log("controller", req.body);
  try {
    const user = await User.findOne({ mail });
    if (user) {
      const token = createTokenEmail(mail);
      await sendForgotPasswordEmail(mail, token);
      await User.updateOne(
        { mail },
        {
          resetToken: token,
        }
      );
    }
    res.json({ message: "Si un compte est associé, vous recevrez un mail" });
  } catch (error) {
    console.log(error);
  }
};

// Mot de passe oublié 2 : réinitialiser le mot de passe
const resetPassword = async (req, res) => {
  const { password, token } = req.body;
  // console.log(req.body);
  try {
    const decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ mail: decoded.mail });
    // console.log("user trouvé", user);
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    await user.save();
    await validateNewPassword(user.mail);
    res.status(200).json({ messageOk: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    res.status(400).json({ message: "Jeton d'authentification invalide" });
  }
};

// Loader pour rester connecté
const stayConnected = async (req, res) => {
  const { tokenUser } = req.cookies; // rechercher le token enregistré dans les cookies
  if (tokenUser) {
    try {
      const decoded = jsonwebtoken.verify(tokenUser, SECRET_KEY);
      // console.log("tokenUser décodé dans stayConnected :", decoded);
      const userIsConnected = await User.findOne({
        // rechercher par l'id ou par le mail
        $or: [
          { _id: decoded.sub }, //sub = subject = id de l'utilisateur
          { mail: decoded.mail },
        ],
      });
      if (userIsConnected) {
        res.status(200).json(userIsConnected);
      } else {
        res.status(400).json(null);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json(null);
    }
  } else {
    res.status(400).json(null);
  }
};

//deconnexion
const signout = async (req, res) => {
  res.clearCookie("tokenUser", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  });
  res.status(200).json({ message: "Déconnexion reussie" });
};

module.exports = {
  signupMail,
  signupMdp,
  verifyMail,
  addChildProfile,
  connexion,
  forgotPassword,
  resetPassword,
  stayConnected,
  signout,
};

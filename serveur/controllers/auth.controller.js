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
      console.log("email de réinitialisation envoyé à ", mail);
      return res.status(400).json({
        success: true, // pour éviter d'informer un potentiel attaquant
        message:
          "Veuillez confirmer votre en inscription en consultant votre boite mail",
      });
    }
    const token = createTokenEmail(mail);
    await sendConfirmationEmail(mail, token);
    console.log("email de confirmation envoyé à ", mail);
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
    const prenomExiste = adult.child.some(
      (child) => child.prenom.toLowerCase() === prenom.toLowerCase()
    );

    if (prenomExiste) {
      return res.status(400).json({ message: "Ce prénom est déjà utilisé." });
    }
    //console.log("prénom unique :", prenomExiste);

    adult.child.push({ prenom, anniversaire, classe });
    await adult.save();
    // console.log("Utilisateur trouvé :", adult);
    res.json({ message: "Enfant reçu", child: adult });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue." });
  }
};

// -- -- -- -- -- -- --
// Connexion Déconnexion
// -- -- -- -- -- -- --

const connexion = async (req, res) => {
  try {
    const { mail, password } = req.body;
    // console.log("login appelée avec", req.body);
    const user = await User.findOne({ mail });
    if (!user) {
      res.status(400).json({ message: "Email et/ou mot de passe incorrect" });
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
  console.log("controller", req.body);
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
  console.log(req.body);
  try {
    const decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ mail: decoded.mail });
    console.log("user trouvé", user);
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

// const changePassword = async (req, res) => {
//   console.log(req.body);
//   // récupérer l'ID
//   const { currentPassword, newPassword, userId } = req.body;
//   try {
//     // récupérer l'utilisateur connecté avec son ID
//     const user = await User.findById(userId);

//     // vérifier que le mot de passe actuel est bien celui de l'utilisateur connecté
//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Mot de passe actuel incorrect" });
//     }

//     // vérifier que le nouveau mot de passe est différent de l'actuel
//     const isSameAsOld = await bcrypt.compare(newPassword, user.password);
//     if (isSameAsOld) {
//       return res.status(401).json({
//         message: "Le nouveau mot de passe doit être différent de l'ancien",
//       });
//     }

//     // tout est OK, on hash le nouveau de mot de passe et on modifie l'utilisateur en BDD
//     const hashed = await bcrypt.hash(newPassword, 10);
//     user.password = hashed;
//     await user.save();
//     // envoi mail et feedback

//     await validateNewPassword(user.email);
//     return res
//       .status(200)
//       .json({ messageOk: "Mot de passe modifié avec succès" });
//   } catch (error) {}

//   // redirection page accueil côté front
// };

module.exports = {
  signupMail,
  signupMdp,
  verifyMail,
  addChildProfile,
  connexion,
  forgotPassword,
  resetPassword,
  // changePassword,
};

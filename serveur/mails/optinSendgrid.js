const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Confirmation d'email
const sendConfirmationEmail = async (mail, token) => {
  const mailOptions = {
    from: process.env.SENDGRID_SENDER,
    to: mail,
    subject: "Confirmation d'inscription",
    html: `<p>Bienvenue sur notre application Coco Game ! </p>
    <br/>
    <p>Cliquez sur le lien suivant pour confirmer votre email et poursuivre l'inscription : 
    <a href="${
      process.env.MODE === "development"
        ? process.env.SENDGRID_API_KEY_URL
        : process.env.DEPLOY_BACK_URL
    }/auth/verifyMail/${token}" style="color: #6C63FF; font-weight: bold;">
    Poursuivre l'inscription</a></p>
    <br/>
    <p>Ce lien est valable <span style="font-weight: bold;">15 minutes </span>, au delà de ce temps vous devrez recommencer le processus d'inscription. </p>
    <br/>
    <p>L’équipe Coco Game</p>`,
  };

  try {
    await sgMail.send(mailOptions);
    console.log("✅ Mail envoyé à ", mail);
  } catch (error) {
    console.error("❌ Erreur envoi email:", error);

    if (error.response) {
      console.error(error.response.body); // détails de SendGrid
    }
  }
};

//Comptes déjà existants
const sendAccountAlreadyExistsEmail = async (mail) => {
  const mailOptions = {
    from: process.env.SENDGRID_SENDER,
    to: mail,
    subject: "Votre compte Coco Game existe déjà",
    html: `
      <p>Bonjour,</p>
       <br/>
      <p>Votre compte existe déjà. Vous pouvez vous connecter depuis le lien ci-dessous :</p>
      <p>
        <a href=${
          process.env.MODE === "development"
            ? process.env.CLIENT_URL
            : process.env.DEPLOY_FRONT_URL
        }/login" style="color: #6C63FF; font-weight: bold;">
          Se connecter à Coco Game
        </a>
      </p>
      <p>
        Si vous n’êtes pas à l’origine de cette tentative, vous pouvez ignorer ce message en toute sécurité.
      </p>
      <br/>
      <p>L’équipe Coco Game</p>
    `,
  };

  try {
    await sgMail.send(mailOptions);
    console.log("✅ Mail envoyé à ", mail);
  } catch (error) {
    console.error("❌ Erreur envoi email:", error);

    if (error.response) {
      console.error(error.response.body); // détails de SendGrid
    }
  }
};

// Mot de passe oublié
const sendForgotPasswordEmail = async (mail, token) => {
  const mailOptions = {
    from: process.env.SENDGRID_SENDER,
    to: mail,
    subject: "Modification du mot de passe",
    html: `
      <p>Bonjour,</p>
       <br/>
      <p>Vous pouvez réinitialiser votre mot de passe depuis le lien ci-dessous :</p>
      <p>
        <a href=""${
          process.env.MODE === "development"
            ? process.env.CLIENT_URL
            : process.env.DEPLOY_FRONT_URL
        }/reinitialiser-mot-de-passe/${token}" style="color: #6C63FF; font-weight: bold;">
          Réinitialiser mon mot de passe
        </a>
      </p>
      <p>
        Si vous n’êtes pas à l’origine de cette tentative, vous pouvez ignorer ce message en toute sécurité.
      </p>
         <br/>
    <p>Ce lien est valable <span style="font-weight: bold;">15 minutes </span>, au delà de ce temps vous devrez recommencer le processus d'authentification. </p>
    <br/>
    <p>L’équipe Coco Game</p>`,
  };

  try {
    await sgMail.send(mailOptions);
    console.log("✅ Mail envoyé à ", mail);
  } catch (error) {
    console.error("❌ Erreur envoi email:", error);

    if (error.response) {
      console.error(error.response.body); // détails de SendGrid
    }
  }
};

// Confirmation du changement de mot de passe
const validateNewPassword = async (mail) => {
  const mailOptions = {
    from: process.env.SENDGRID_SENDER,
    to: mail,
    subject: "Modification du mot de passe réussie",
    html: `
      <p>Bonjour,</p>
       <br/>
      <p>Votre mot de passe a bien été modifié. Vous pouvez maintenant vous connecter :</p>
         <a href="${
           process.env.MODE === "development"
             ? process.env.CLIENT_URL
             : process.env.DEPLOY_FRONT_URL
         }/connexion" style="color: #6C63FF; font-weight: bold;">
          Se connecter à Coco Game
        </a>
      </p>
      
      <br/>
      <p>L’équipe Coco Game</p>
    `,
  };

  try {
    await sgMail.send(mailOptions);
    console.log("✅ Mail envoyé à ", mail);
  } catch (error) {
    console.error("❌ Erreur envoi email:", error);

    if (error.response) {
      console.error(error.response.body); // détails de SendGrid
    }
  }
};

module.exports = {
  sendConfirmationEmail,
  sendAccountAlreadyExistsEmail,
  sendForgotPasswordEmail,
  validateNewPassword,
};

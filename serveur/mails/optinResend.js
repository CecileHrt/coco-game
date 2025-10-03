const { Resend } = require("resend");
const dotenv = require("dotenv");

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);
//Confirmation d'email
const sendConfirmationEmail = async (mail, token) => {
  try {
    await resend.emails.send({
      from: process.env.RESEND_SENDER,
      to: mail,
      subject: "Confirmation d'inscription",
      html: `<p>Bienvenue sur notre application Coco Game ! </p>
      <br/>
      <p>Cliquez sur le lien suivant pour confirmer votre email et poursuivre l'inscription : 
      <a href="${
        process.env.MODE === "development"
          ? process.env.API_URL
          : process.env.DEPLOY_BACK_URL
      }/auth/verifyMail/${token}" style="color: #6C63FF; font-weight: bold;">
       Poursuivre l'inscription</a></p>
      <br/>
      <p>Ce lien est valable <span style="font-weight: bold;"15 minutes </span>, au delà de ce temps vous devrez recommencer le processus d'inscription. </p>
      <br/>
      <p>Lʼéquipe Coco Game</p>`,
    });
    console.log(" Mail envoyé à ", mail);
  } catch (error) {
    console.error(" Erreur envoi email:", error);
  }
};

//Comptes déjà existants
const sendAccountAlreadyExistsEmail = async (mail) => {
  try {
    await resend.emails.send({
      from: process.env.RESEND_SENDER,
      to: mail,
      subject: "Votre compte Coco Game existe déjà",
      html: `
      <p>Bonjour,</p>
       <br/>
      <p>Votre compte existe déjà. Vous pouvez vous connecter depuis le lien ci-dessous :</p>
      <p>
        <a href="${
          process.env.MODE === "development"
            ? process.env.API_URL
            : process.env.DEPLOY_BACK_URL
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
    });
    console.log(" Mail envoyé à ", mail);
  } catch (error) {
    console.error(" Erreur envoi email:", error);
  }
};

// Mot de passe oublié
const sendForgotPasswordEmail = async (email, token) => {
  try {
    await resend.emails.send({
      from: process.env.RESEND_SENDER,
      to: email,
      subject: "Modification du mot de passe",
      html: `
      <p>Bonjour,</p>
       <br/>
      <p>Vous pouvez réinitialiser votre mot de passe depuis le lien ci-dessous :</p>
      <p>
        <a href="${
          process.env.MODE === "development"
            ? process.env.API_URL
            : process.env.DEPLOY_BACK_URL
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
    });
    console.log(" Mail envoyé à ", mail);
  } catch (error) {
    console.error(" Erreur envoi email:", error);
  }
};

// Confirmation du changement de mot de passe
const validateNewPassword = async (email) => {
  try {
    await resend.emails.send({
      from: process.env.RESEND_SENDER,
      to: email,
      subject: "Modification du mot de passe réussie",
      html: `
      <p>Bonjour,</p>
       <br/>
      <p>Votre mot de passe a bien été modifié. Vous pouvez maintenant vous connecter :</p>
         <a href="${
           process.env.MODE === "development"
             ? process.env.API_URL
             : process.env.DEPLOY_BACK_URL
         }/connexion" style="color: #6C63FF; font-weight: bold;">
          Se connecter à Coco Game
        </a>
      </p>
      
      <br/>
      <p>L’équipe Coco Game</p>
    `,
    });
    console.log(" Mail envoyé à ", mail);
  } catch (error) {
    console.error(" Erreur envoi email:", error);
  }
};

module.exports = {
  sendConfirmationEmail,
  sendAccountAlreadyExistsEmail,
  sendForgotPasswordEmail,
  validateNewPassword,
};

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = async (mail, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: mail,
    subject: "Confirmation d'inscription",
    html: `<p>Bienvenue sur notre application Coco Game ! </p>
    <br/>
    <p>Cliquez sur le lien suivant pour confirmer votre email et poursuivre l'inscription : 
    <a href="${process.env.API_URL}/auth/verifyMail/${token}" style="color: #6C63FF; font-weight: bold;">
    Poursuivre l'inscription</a></p>
    <br/>
    <p>Ce lien est valable <span style="font-weight: bold;">15 minutes </span>, au delà de ce temps vous devrez recommencer le processus d'inscription. </p>
    <br/>
    <p>L’équipe Coco Game</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendAccountAlreadyExistsEmail = async (mail) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: mail,
    subject: "Votre compte Coco Game existe déjà",
    html: `
      <p>Bonjour,</p>
       <br/>
      <p>Votre compte existe déjà. Vous pouvez vous connecter depuis le lien ci-dessous :</p>
      <p>
        <a href="${process.env.CLIENT_URL}/login" style="color: #6C63FF; font-weight: bold;">
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

  await transporter.sendMail(mailOptions);
};
module.exports = {
  sendConfirmationEmail,
  sendAccountAlreadyExistsEmail,
};

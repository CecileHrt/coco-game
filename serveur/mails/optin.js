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
    html: `<p>Bienvenue sur notre application Coco Game ! <br/><br/>
    Cliquez sur le lien suivant pour confirmer votre email et poursuivre l'inscription : 
    <a href="${process.env.API_URL}/auth/verifyMail/${token}">
    Poursuivre l'inscription</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendInvalidEmailToken = async (mail) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: mail,
    subject: "Problème lors de la validation",
    html: `<p>Token expiré ! <br/><br/>
    Veuillez vous réinscrire :
    <a href="${process.env.CLIENT_URL}/register">S'inscrire'</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendConfirmationEmail,
  sendInvalidEmailToken,
};

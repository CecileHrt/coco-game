describe("Parcours inscription", () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:3000/auth/signup-mail", {
      statusCode: 200,
      body: { message: "Email envoyé" },
    }).as("signupMail");

    cy.intercept("POST", "http://localhost:3000/auth/finaliser-inscription", {
      statusCode: 200,
      body: {
        message: "Inscription réussie !",
        user: { mail: "mauricette@gmail.com" },
        redirect: "/creer-profil-enfant",
      },
    }).as("finaliserInscription");

    cy.visit("http://localhost:5173/inscription");
  });

  it("Parcours utilisateur inscription", () => {
    cy.get('input[name="mail"]').type("mauricette@gmail.com");
    cy.contains("Transmettre").click();

    cy.url().should("include", "/inscription/finaliser-inscription");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get('input[name="rgpd"]').click();
    cy.contains("Créer un compte").click();

    cy.url().should("include", "/creer-profil-enfant");
  });
});

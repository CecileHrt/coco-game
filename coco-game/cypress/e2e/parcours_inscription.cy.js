//<reference types="cypress" />;

describe("Parcours d'inscription", () => {
  it("ÉTAPE 1 : permet à l'utilisateur de s'inscrire avec son email", () => {
    // Intercepter l’appel API AVANT de visiter la page
    cy.intercept("POST", "http://localhost:3000/auth", {
      statusCode: 201,
      body: { success: true, message: "ok" },
    }).as("signupMail");

    cy.visit("/inscription");

    cy.get('input[name="mail"]').type("test@example.com");
    cy.contains("Transmettre mon email").click();

    cy.wait("@signupMail").its("request.body").should("deep.equal", {
      mail: "test@example.com",
    });

    // Vérifier qu'on reste bien sur la page /inscription
    cy.url().should("include", "/inscription");

    // Vérifier qu’un message de confirmation s’affiche
    cy.contains("Un email de confirmation a été envoyé !").should("exist");
  });

  it("ÉTAPE 2 : permet à l'utilisateur de finaliser avec mot de passe et créer un profil enfant", () => {
    // Intercepter les appels API
    cy.intercept("POST", "http://localhost:3000/auth/finaliser-inscription/*", {
      statusCode: 201,
      body: {
        message: "Inscription réussie !",
        user: { _id: "123", mail: "test@example.com" },
      },
    }).as("signupMdp");

    cy.intercept("POST", "http://localhost:3000/profile", {
      statusCode: 201,
      body: { success: true },
    }).as("createProfile");

    // IMPORTANT : on simule le clic dans le mail AVEC token
    cy.visit("/inscription/finaliser-inscription?token=fakeToken123");

    // ---- saisie du mot de passe ----
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get('input[name="rgpd"]').check();

    cy.contains("Créer un compte").click();

    cy.wait("@signupMdp");

    cy.url().should("include", "/creer-profil-enfant");
    cy.contains("Créer un profil enfant").should("exist");

    // ---- création du profil enfant ----
    cy.get('input[name="prenom"]').type("Mauricette");
    cy.get('input[name="anniversaire"]').type("2017-07-10");
    cy.get('select[name="classe"]').select("CP");
    cy.get('input[name="accParental"]').check();

    cy.contains("Créer un profil enfant").click();
  });
});

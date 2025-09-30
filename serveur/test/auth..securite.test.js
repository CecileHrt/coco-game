const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../index");
const setupTestDB = require("./setupTestDB");
const User = require("../models/auth.model.js");

// simulation d'email
jest.mock("../mails/optin.js", () => ({
  sendConfirmationEmail: jest.fn(),
  sendAccountAlreadyExistsEmail: jest.fn(),
  sendForgotPasswordEmail: jest.fn(),
  validateNewPassword: jest.fn(),
}));

// tester le middleware
const SECRET_KEY = process.env.SECRET_KEY || "test_secret";

beforeAll(async () => {
  await setupTestDB.connect();
});

afterAll(async () => {
  await setupTestDB.closeDatabase();
});

afterEach(async () => {
  await setupTestDB.clearDatabase();
});

// test Injection SQL
describe("Sécurité authentification", () => {
  it("Refuser une tentative d'injection SQL sur /connexion", async () => {
    // indiquer une connexion via la route indiquée
    const res = await request(app)
      .post("/auth/connexion")
      .send({
        mail: { $ne: null },
        password: { $ne: null }, //va récuopérer tous les email et mdp qui ne sont pas égal à null
      });
    //si données trouvées alors ne pas renvoyer user mais un status 400
    expect([400, 401]).toContain(res.statusCode); // apdapter les status par rapport à ce qui est utilisé dans le controller
  });

  // test JWT Falsifié
  it("refuser un Jwt falsifié sur /auth/isConnected", async () => {
    const res = await request(app)
      .get("/auth/isConnected")
      .set("Cookie", ["tokenUsser=fakeToken"]);

    expect([400, 401]).toContain(res.statusCode);
  });
  // Tester l'ajout d'un enfant
  it("autorise un utilisateur valide sur une route protégée (addChildProfile)", async () => {
    const created = new User({
      mail: "ok@test.com",
      password: "hashedpassword",
      rgpd: true,
    });
    await created.save();

    const token = jwt.sign({}, SECRET_KEY, {
      subject: created._id.toString(),
      expiresIn: "7d",
      algorithm: "HS256",
    });

    const res = await request(app)
      .post("/auth/creer-profil-enfant")
      .set("Cookie", [`tokenUser=${token}`])
      .send({
        prenom: "Maximilien",
        anniversaire: "2018-01-01",
        classe: "CP",
      });
    expect([200, 201]).toContain(res.statusCode);
  });
  //Nombre de tentative de connexionnpm
  it("bloque après trop de tentatives (loginLimiter) si appliqué sur /auth/connexion", async () => {
    for (let i = 0; i < 4; i++) {
      await request(app)
        .post("/auth/connexion")
        .send({ mail: "fake@test.com", password: "badpass" });
    }

    const res = await request(app)
      .post("/auth/connexion")
      .send({ mail: "fake@test.com", password: "badpass" });

    expect(res.statusCode).toBe(429);
    expect(res.body.message).toMatch(/trop|tentatives|réessayez/i);
  });
});

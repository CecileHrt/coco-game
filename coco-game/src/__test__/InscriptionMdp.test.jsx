import InscriptionMdp from "../forms/signup/InscriptionMdp";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect } from "vitest";

describe("InscriptionMdp", () => {
  it("afficher les champs mot de passe + confirmation dans le formulaire", () => {
    render(
      <MemoryRouter>
        <InscriptionMdp />
      </MemoryRouter>
    );

    // vérifie que le champ mot de passe est dans le document
    expect(screen.getByLabelText(/^Mot de passe/i)).toBeInTheDocument(); // ^ pour commencer par (car "Mot de passe" et "Confirmation de mot de passe" dans le même composant)
  });

  it("Afficher une erreur si les mots de passe ne correspondent pas", async () => {
    render(
      <MemoryRouter>
        <InscriptionMdp />
      </MemoryRouter>
    );

    // vérifie que le champ mot de passe est dans le document
    const password = screen.getByLabelText(/^Mot de passe/i);
    const confirmPassword = screen.getByLabelText(
      /Confirmation de mot de passe/i
    );

    // simuler la saisie des mots de passe
    fireEvent.input(password, { target: { value: "password123" } });
    // .input (objet, avec clé target comprenant une clé value)
    fireEvent.input(confirmPassword, { target: { value: "password124" } });

    // simuler la soumission du formulaire
    const form = screen.getByTestId("inscriptionMdp-form"); // nécéssite l'ajout préablable d'un attribut dans le form
    fireEvent.submit(form);

    // Afficher la notificiation d'erreur correspondance des mots de passe
    expect(
      await screen.findByText(/Les mots de passe ne correspondent pas/i)
    ).toBeInTheDocument();
  });

  it("Vérifier que la case RGPD est cochée", async () => {
    render(
      <MemoryRouter>
        <InscriptionMdp />
      </MemoryRouter>
    );

    // vérifie que la case rgpd est cochée
    const rgpd = screen.getByLabelText(/Données personnelles/i);

    expect(rgpd.checked).toEqual(false);
    fireEvent.click(rgpd);
    expect(rgpd.checked).toEqual(true);
  });
});

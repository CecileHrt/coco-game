import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import InscriptionMail from "../forms/signup/InscriptionMail";
import { expect } from "vitest";

describe("InscriptionMail", () => {
  it("Affiche le champ email dans le formulaire", () => {
    render(
      <MemoryRouter>
        <InscriptionMail />
      </MemoryRouter>
    );

    // vérifie que le champ email est dans le document
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  it("Affiche une erreur si le champs mail est vide", async () => {
    render(
      <MemoryRouter>
        <InscriptionMail />
      </MemoryRouter>
    );

    const form = screen.getByTestId("inscription-form"); // nécéssite l'ajout préablable d'un attribut dans le form
    fireEvent.submit(form);
    expect(
      await screen.findByText(/Le champ est obligatoire/i)
    ).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import InscriptionMdp from "../forms/signup/InscriptionMdp";
import CreationProfilEnf from "../forms/CreationProfilEnf";
import userEvent from "@testing-library/user-event";

vi.mock("../apis/auth.api.js", () => ({
  signupMdp: vi.fn(() =>
    Promise.resolve({
      user: { id: 1, name: "Jane Doe" },
      message: "Inscription réussie",
    })
  ),
}));

describe("Inscription - Intégration", () => {
  it("naviguer vers la page créer profil enfant après connexion", async () => {
    render(
      <MemoryRouter initialEntries={["/inscription/finaliser-inscription"]}>
        <Routes>
          <Route
            path="/inscription/finaliser-inscription"
            element={<InscriptionMdp />}
          />
          <Route path="/creer-profil-enfant" element={<CreationProfilEnf />} />
        </Routes>
      </MemoryRouter>
    );

    const password = screen.getByLabelText(/^Mot de passe/i);
    const confirmPassword = screen.getByLabelText(
      /Confirmation de mot de passe/i
    );
    const rgpd = screen.getByLabelText(/Données personnelles/i);

    fireEvent.input(password, { target: { value: "password123" } });
    fireEvent.input(confirmPassword, { target: { value: "password123" } });
    fireEvent.click(rgpd);

    const button = screen.getByRole("button", { name: /Créer un compte/i });
    await userEvent.click(button);

    expect(await screen.findByLabelText(/Prénom/i)).toBeInTheDocument();
  });
});

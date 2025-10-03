import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBarJeu from "../components/NavBarJeu";

describe("NavBarJeu", () => {
  it("affiche le logo et le titre", () => {
    // simule le routing + le rendu du composant NavBarJeu
    render(
      <MemoryRouter>
        <NavBarJeu />
      </MemoryRouter>
    );

    // vérifie que le logo (texte car strong) est dans le document // i pour ignorer la casse
    expect(screen.getByText(/Coco Game/i)).toBeInTheDocument();
    // vérifie que l'image avec le alt est dans le document
    expect(screen.getByAltText(/logo de l'application/i)).toBeInTheDocument();
  });
  it("Ouvre le menu quand on clique sur le menu burger", () => {
    render(
      <MemoryRouter>
        <NavBarJeu />
      </MemoryRouter>
    );

    // on récupère le bouton burger via son role
    const burgerButton = screen.getByRole("button");
    // on clique sur le bouton burger
    fireEvent.click(burgerButton);

    expect(screen.getByText(/Se connecter/i)).toBeInTheDocument();
  });
});

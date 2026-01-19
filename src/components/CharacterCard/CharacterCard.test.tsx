import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CharacterCard from "./CharacterCard";
import type { Character } from "@/api/types";

const mockCharacter: Character = {
  id: "1",
  name: "Rick Sanchez",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth (C-137)" },
  location: { name: "Citadel of Ricks" },
  episode: [],
  created: "2017-11-04T18:48:46.250Z",
};

const renderWithRouter = (character: Character) => {
  return render(
    <MemoryRouter>
      <CharacterCard character={character} />
    </MemoryRouter>,
  );
};

describe("CharacterCard", () => {
  it("renders character name", () => {
    renderWithRouter(mockCharacter);

    expect(screen.getByRole("heading", { name: "Rick Sanchez" })).toBeInTheDocument();
  });

  it("renders character image with lazy loading", () => {
    renderWithRouter(mockCharacter);

    const image = screen.getByTestId("character-card-image");
    expect(image).toHaveAttribute("src", mockCharacter.image);
    expect(image).toHaveAttribute("loading", "lazy");
  });

  it("renders character metadata", () => {
    renderWithRouter(mockCharacter);

    expect(screen.getByTestId("character-card-status")).toHaveTextContent("Alive");
    expect(screen.getByTestId("character-card-species")).toHaveTextContent("Human");
    expect(screen.getByTestId("character-card-gender")).toHaveTextContent("Male");
  });

  it("links to character detail page", () => {
    renderWithRouter(mockCharacter);

    const link = screen.getByTestId("character-card-1");
    expect(link).toHaveAttribute("href", "/character/1");
  });

  it("renders status indicator for alive character", () => {
    renderWithRouter({ ...mockCharacter, status: "Alive" });

    expect(screen.getByTestId("character-card-status")).toHaveTextContent("Alive");
  });

  it("renders status indicator for dead character", () => {
    renderWithRouter({ ...mockCharacter, status: "Dead" });

    expect(screen.getByTestId("character-card-status")).toHaveTextContent("Dead");
  });

  it("renders status indicator for unknown status", () => {
    renderWithRouter({ ...mockCharacter, status: "unknown" });

    expect(screen.getByTestId("character-card-status")).toHaveTextContent("unknown");
  });
});

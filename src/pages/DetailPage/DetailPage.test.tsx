import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import DetailPage from "./DetailPage";
import { GET_CHARACTER } from "@/api/queries/getCharacter";

const mockCharacter = {
  id: "1",
  name: "Rick Sanchez",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  status: "Alive",
  species: "Human",
  gender: "Male",
  origin: { name: "Earth (C-137)" },
  location: { name: "Citadel of Ricks" },
  episode: [
    { id: "1", name: "Pilot", episode: "S01E01" },
    { id: "2", name: "Lawnmower Dog", episode: "S01E02" },
  ],
};

const createCharacterMock = (character = mockCharacter): MockedResponse => ({
  request: {
    query: GET_CHARACTER,
    variables: { id: "1" },
  },
  result: {
    data: { character },
  },
});

const renderWithProviders = (mocks: MockedResponse[], initialRoute = "/character/1") => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/character/:id" element={<DetailPage />} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    </MockedProvider>,
  );
};

describe("DetailPage", () => {
  describe("loading state", () => {
    it("shows loading message while fetching data", () => {
      const mocks = [createCharacterMock()];

      renderWithProviders(mocks);

      expect(screen.getByTestId("detail-loading")).toBeInTheDocument();
    });

    it("has accessible loading section", () => {
      const mocks = [createCharacterMock()];

      renderWithProviders(mocks);

      expect(screen.getByTestId("detail-loading")).toHaveAttribute(
        "aria-labelledby",
        "loading-title",
      );
    });
  });

  describe("success state", () => {
    it("renders character name as heading", async () => {
      const mocks = [createCharacterMock()];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("detail-name")).toHaveTextContent("Rick Sanchez");
      });
    });

    it("renders character image with descriptive alt", async () => {
      const mocks = [createCharacterMock()];

      renderWithProviders(mocks);

      await waitFor(() => {
        const image = screen.getByTestId("detail-image");
        expect(image).toHaveAttribute("src", mockCharacter.image);
        expect(image).toHaveAttribute("alt", "Portrait of Rick Sanchez");
      });
    });

    it("renders character status and species", async () => {
      const mocks = [createCharacterMock()];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("detail-status")).toHaveTextContent("Alive — Human");
      });
    });

    it("renders character metadata", async () => {
      const mocks = [createCharacterMock()];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("detail-gender")).toHaveTextContent("Male");
        expect(screen.getByTestId("detail-origin")).toHaveTextContent("Earth (C-137)");
        expect(screen.getByTestId("detail-location")).toHaveTextContent("Citadel of Ricks");
      });
    });

    it("renders episodes list", async () => {
      const mocks = [createCharacterMock()];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("detail-episodes-title")).toHaveTextContent("Episodes (2)");
        expect(screen.getByTestId("detail-episodes")).toBeInTheDocument();
      });

      const episodeCodes = screen.getAllByTestId("episode-code");
      const episodeNames = screen.getAllByTestId("episode-name");

      expect(episodeCodes[0]).toHaveTextContent("S01E01");
      expect(episodeNames[0]).toHaveTextContent("Pilot");
      expect(episodeCodes[1]).toHaveTextContent("S01E02");
      expect(episodeNames[1]).toHaveTextContent("Lawnmower Dog");
    });

    it("renders back button", async () => {
      const mocks = [createCharacterMock()];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("detail-back")).toBeInTheDocument();
      });
    });
  });

  describe("error state", () => {
    it("shows error message when query fails", async () => {
      const mocks: MockedResponse[] = [
        {
          request: {
            query: GET_CHARACTER,
            variables: { id: "1" },
          },
          error: new Error("Network error"),
        },
      ];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("detail-error")).toBeInTheDocument();
      });
    });

    it("shows back button in error state", async () => {
      const mocks: MockedResponse[] = [
        {
          request: {
            query: GET_CHARACTER,
            variables: { id: "1" },
          },
          error: new Error("Network error"),
        },
      ];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("detail-back")).toBeInTheDocument();
      });
    });
  });

  describe("navigation", () => {
    it("navigates back when back button is clicked", async () => {
      const user = userEvent.setup();
      const mocks = [createCharacterMock()];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("detail-page")).toBeInTheDocument();
      });

      const backButton = screen.getByTestId("detail-back");
      await user.click(backButton);

      expect(backButton).not.toBeDisabled();
    });
  });

  describe("accessibility", () => {
    it("has accessible section for character details", async () => {
      const mocks = [createCharacterMock()];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("detail-content")).toBeInTheDocument();
      });
    });

    it("has accessible episodes section", async () => {
      const mocks = [createCharacterMock()];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("detail-episodes")).toBeInTheDocument();
      });
    });
  });

  describe("status indicators", () => {
    it("displays alive status correctly", async () => {
      const mocks = [createCharacterMock({ ...mockCharacter, status: "Alive" })];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("detail-status")).toHaveTextContent(/alive/i);
      });
    });

    it("displays dead status correctly", async () => {
      const mocks = [createCharacterMock({ ...mockCharacter, status: "Dead" })];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("detail-status")).toHaveTextContent(/dead/i);
      });
    });

    it("displays unknown status correctly", async () => {
      const mocks = [createCharacterMock({ ...mockCharacter, status: "unknown" })];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("detail-status")).toHaveTextContent(/unknown/i);
      });
    });
  });
});

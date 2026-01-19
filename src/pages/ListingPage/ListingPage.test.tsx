import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import ListingPage from "./ListingPage";
import { GET_CHARACTERS } from "@/api/queries/getCharacters";
import type { Character } from "@/api/types";

const createMockCharacter = (id: string, name: string): Character => ({
  id,
  name,
  image: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`,
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth" },
  location: { name: "Earth" },
  episode: [],
  created: "",
});

const createCharactersMock = (
  characters: Character[],
  page = 1,
  totalPages = 1,
  totalCount = characters.length,
): MockedResponse => ({
  request: {
    query: GET_CHARACTERS,
    variables: { page, filter: {} },
  },
  result: {
    data: {
      characters: {
        info: {
          count: totalCount,
          pages: totalPages,
          next: page < totalPages ? page + 1 : null,
          prev: page > 1 ? page - 1 : null,
        },
        results: characters,
      },
    },
  },
});

const renderWithProviders = (mocks: MockedResponse[]) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <ListingPage />
      </MemoryRouter>
    </MockedProvider>,
  );
};

describe("ListingPage", () => {
  describe("loading state", () => {
    it("shows loading message while fetching data", () => {
      const mocks = [createCharactersMock([createMockCharacter("1", "Rick")])];

      renderWithProviders(mocks);

      expect(screen.getByTestId("listing-loading")).toBeInTheDocument();
    });
  });

  describe("success state", () => {
    it("renders character cards after loading", async () => {
      const mocks = [
        createCharactersMock([
          createMockCharacter("1", "Rick Sanchez"),
          createMockCharacter("2", "Morty Smith"),
        ]),
      ];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("character-card-1")).toBeInTheDocument();
        expect(screen.getByTestId("character-card-2")).toBeInTheDocument();
      });
    });

    it("displays character count", async () => {
      const mocks = [createCharactersMock([createMockCharacter("1", "Rick")], 1, 1, 826)];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("listing-count")).toHaveTextContent(
          "Showing 1 of 826 characters",
        );
      });
    });

    it("renders page title", () => {
      const mocks = [createCharactersMock([])];

      renderWithProviders(mocks);

      expect(screen.getByRole("heading", { name: "Characters", level: 1 })).toBeInTheDocument();
    });
  });

  describe("empty state", () => {
    it("shows empty message when no characters match filters", async () => {
      const mocks: MockedResponse[] = [
        {
          request: {
            query: GET_CHARACTERS,
            variables: { page: 1, filter: {} },
          },
          result: {
            data: {
              characters: {
                info: { count: 0, pages: 0, next: null, prev: null },
                results: [],
              },
            },
          },
        },
      ];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("listing-empty")).toBeInTheDocument();
      });
    });
  });

  describe("error state", () => {
    it("shows error message when query fails", async () => {
      const mocks: MockedResponse[] = [
        {
          request: {
            query: GET_CHARACTERS,
            variables: { page: 1, filter: {} },
          },
          error: new Error("Network error"),
        },
      ];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("listing-error")).toBeInTheDocument();
      });
    });
  });

  describe("pagination", () => {
    it("renders pagination when multiple pages exist", async () => {
      const mocks = [createCharactersMock([createMockCharacter("1", "Rick")], 1, 3)];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("pagination")).toBeInTheDocument();
      });
    });

    it("does not render pagination for single page", async () => {
      const mocks = [createCharactersMock([createMockCharacter("1", "Rick")], 1, 1)];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("listing-grid")).toBeInTheDocument();
      });

      expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
    });
  });

  describe("filters", () => {
    it("renders filter controls", () => {
      const mocks = [createCharactersMock([createMockCharacter("1", "Rick")])];

      renderWithProviders(mocks);

      expect(screen.getByTestId("filters")).toBeInTheDocument();
    });
  });

  describe("sort controls", () => {
    it("renders sort dropdown", () => {
      const mocks = [createCharactersMock([createMockCharacter("1", "Rick")])];

      renderWithProviders(mocks);

      expect(screen.getByTestId("sort-controls")).toBeInTheDocument();
    });

    it("sorts characters when sort option changes", async () => {
      const mocks = [
        createCharactersMock([
          createMockCharacter("1", "Morty"),
          createMockCharacter("2", "Rick"),
          createMockCharacter("3", "Beth"),
        ]),
      ];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("listing-grid")).toBeInTheDocument();
      });

      // By default, sorted by name: Beth, Morty, Rick
      const headings = screen.getAllByRole("heading", { level: 3 });
      expect(headings[0]).toHaveTextContent("Beth");
      expect(headings[1]).toHaveTextContent("Morty");
      expect(headings[2]).toHaveTextContent("Rick");
    });
  });

  describe("accessibility", () => {
    it("has accessible character list", async () => {
      const mocks = [createCharactersMock([createMockCharacter("1", "Rick")])];

      renderWithProviders(mocks);

      await waitFor(() => {
        expect(screen.getByTestId("listing-grid")).toHaveAttribute("aria-label", "Character list");
      });
    });

    it("indicates loading state with aria-busy", () => {
      const mocks = [createCharactersMock([createMockCharacter("1", "Rick")])];

      renderWithProviders(mocks);

      expect(screen.getByTestId("listing-grid-container")).toHaveAttribute("aria-busy", "true");
    });
  });
});

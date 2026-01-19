import { renderHook, act } from "@testing-library/react";
import { useFilters } from "./useFilters";
import type { Character } from "@/api/types";

const createMockCharacter = (overrides: Partial<Character> = {}): Character => ({
  id: "1",
  name: "Rick Sanchez",
  image: "",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth" },
  location: { name: "Earth" },
  episode: [],
  created: "",
  ...overrides,
});

describe("useFilters", () => {
  describe("filter management", () => {
    it("initializes with empty filter", () => {
      const { result } = renderHook(() => useFilters());

      expect(result.current.filter).toEqual({});
    });

    it("updates filter when updateFilter is called", () => {
      const { result } = renderHook(() => useFilters());

      act(() => {
        result.current.updateFilter("status", "Alive");
      });

      expect(result.current.filter).toEqual({ status: "Alive" });
    });

    it("removes filter key when value is empty string", () => {
      const { result } = renderHook(() => useFilters());

      act(() => {
        result.current.updateFilter("status", "Alive");
      });

      act(() => {
        result.current.updateFilter("status", "");
      });

      expect(result.current.filter.status).toBeUndefined();
    });

    it("clears all filters when clearFilters is called", () => {
      const { result } = renderHook(() => useFilters());

      act(() => {
        result.current.updateFilter("status", "Alive");
        result.current.updateFilter("gender", "Male");
      });

      act(() => {
        result.current.clearFilters();
      });

      expect(result.current.filter).toEqual({});
    });
  });

  describe("sort management", () => {
    it("initializes with name as default sort field", () => {
      const { result } = renderHook(() => useFilters());

      expect(result.current.sortField).toBe("name");
    });

    it("updates sort field when setSortField is called", () => {
      const { result } = renderHook(() => useFilters());

      act(() => {
        result.current.setSortField("status");
      });

      expect(result.current.sortField).toBe("status");
    });
  });

  describe("sortCharacters", () => {
    it("sorts characters by name alphabetically", () => {
      const { result } = renderHook(() => useFilters());

      const characters = [
        createMockCharacter({ id: "1", name: "Morty" }),
        createMockCharacter({ id: "2", name: "Rick" }),
        createMockCharacter({ id: "3", name: "Beth" }),
      ];

      const sorted = result.current.sortCharacters(characters);

      expect(sorted.map((c) => c.name)).toEqual(["Beth", "Morty", "Rick"]);
    });

    it("sorts characters by status alphabetically", () => {
      const { result } = renderHook(() => useFilters());

      act(() => {
        result.current.setSortField("status");
      });

      const characters = [
        createMockCharacter({ id: "1", status: "Dead" }),
        createMockCharacter({ id: "2", status: "Alive" }),
        createMockCharacter({ id: "3", status: "unknown" }),
      ];

      const sorted = result.current.sortCharacters(characters);

      expect(sorted.map((c) => c.status)).toEqual(["Alive", "Dead", "unknown"]);
    });

    it("sorts characters by species alphabetically", () => {
      const { result } = renderHook(() => useFilters());

      act(() => {
        result.current.setSortField("species");
      });

      const characters = [
        createMockCharacter({ id: "1", species: "Human" }),
        createMockCharacter({ id: "2", species: "Alien" }),
        createMockCharacter({ id: "3", species: "Robot" }),
      ];

      const sorted = result.current.sortCharacters(characters);

      expect(sorted.map((c) => c.species)).toEqual(["Alien", "Human", "Robot"]);
    });

    it("does not mutate original array", () => {
      const { result } = renderHook(() => useFilters());

      const characters = [
        createMockCharacter({ id: "1", name: "Morty" }),
        createMockCharacter({ id: "2", name: "Rick" }),
      ];

      const originalOrder = [...characters];
      result.current.sortCharacters(characters);

      expect(characters).toEqual(originalOrder);
    });

    it("handles empty array", () => {
      const { result } = renderHook(() => useFilters());

      const sorted = result.current.sortCharacters([]);

      expect(sorted).toEqual([]);
    });

    it("handles case-insensitive sorting", () => {
      const { result } = renderHook(() => useFilters());

      const characters = [
        createMockCharacter({ id: "1", name: "rick" }),
        createMockCharacter({ id: "2", name: "MORTY" }),
        createMockCharacter({ id: "3", name: "Beth" }),
      ];

      const sorted = result.current.sortCharacters(characters);

      expect(sorted.map((c) => c.name)).toEqual(["Beth", "MORTY", "rick"]);
    });
  });
});

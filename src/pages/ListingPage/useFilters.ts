import { useState, useCallback } from "react";
import type { Character, CharacterFilter } from "@/api/types";
import type { SortField } from "@/components/SortControls/types";

export const useFilters = () => {
  const [filter, setFilter] = useState<CharacterFilter>({});
  const [sortField, setSortField] = useState<SortField>("name");

  const updateFilter = useCallback((key: keyof CharacterFilter, value: string) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilter({});
  }, []);

  const sortCharacters = useCallback(
    (characters: Character[]): Character[] => {
      return [...characters].sort((a, b) => {
        const firstValue = a[sortField]?.toLowerCase() ?? "";
        const secondValue = b[sortField]?.toLowerCase() ?? "";
        return firstValue.localeCompare(secondValue);
      });
    },
    [sortField],
  );

  return {
    filter,
    updateFilter,
    clearFilters,
    sortField,
    setSortField,
    sortCharacters,
  };
};

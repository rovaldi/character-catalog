import type { CharacterFilter } from "@/api/types";

export interface FiltersProps {
  filter: CharacterFilter;
  onFilterChange: (key: keyof CharacterFilter, value: string) => void;
  onClear: () => void;
}

export type SortField = "name" | "status" | "species";

export interface SortOption {
  value: SortField;
  label: string;
}

export interface SortControlsProps {
  sortField: SortField;
  onSortFieldChange: (field: SortField) => void;
}

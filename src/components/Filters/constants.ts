import type { CharacterGender, CharacterStatus } from "@/api/types";
import { CHARACTER_GENDER_VALUES, CHARACTER_STATUS_VALUES } from "@/api/constants";
import type { SelectOption } from "./SelectFilter/types";

const formatLabel = (value: string): string => (value === "unknown" ? "Unknown" : value);

export const STATUS_OPTIONS: Array<SelectOption<CharacterStatus>> = [
  { value: "", label: "All statuses" },
  ...CHARACTER_STATUS_VALUES.map((status) => ({
    value: status,
    label: formatLabel(status),
  })),
];

export const GENDER_OPTIONS: Array<SelectOption<CharacterGender>> = [
  { value: "", label: "All genders" },
  ...CHARACTER_GENDER_VALUES.map((gender) => ({
    value: gender,
    label: formatLabel(gender),
  })),
];

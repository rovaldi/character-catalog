export interface SelectOption<T extends string> {
  value: T | "";
  label: string;
}

export interface SelectFilterProps<T extends string> {
  label: string;
  value: T | "";
  options: Array<SelectOption<T>>;
  onChange: (value: T | "") => void;
  testId?: string;
}

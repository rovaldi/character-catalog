import { useId } from "react";
import type { SelectFilterProps } from "./types";
import styles from "./SelectFilter.module.scss";

const SelectFilter = <T extends string>({
  label,
  value,
  options,
  onChange,
  testId,
}: SelectFilterProps<T>) => {
  const selectId = useId();

  return (
    <div className={styles.selectFilter} data-testid={testId}>
      <label htmlFor={selectId} className={styles.selectFilter__label}>
        {label}
      </label>
      <select
        id={selectId}
        className={styles.selectFilter__select}
        value={value}
        onChange={(e) => onChange(e.target.value as T | "")}
        data-testid={testId ? `${testId}-select` : undefined}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;

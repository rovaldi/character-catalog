import { useId } from "react";
import type { SortControlsProps, SortField } from "./types";
import { SORT_OPTIONS } from "./constants";
import styles from "./SortControls.module.scss";

const SortControls = ({ sortField, onSortFieldChange }: SortControlsProps) => {
  const selectId = useId();

  return (
    <div className={styles.sortControls} data-testid="sort-controls">
      <label htmlFor={selectId} className={styles.sortControls__label}>
        Sort by
      </label>
      <select
        id={selectId}
        className={styles.sortControls__select}
        value={sortField}
        onChange={(e) => onSortFieldChange(e.target.value as SortField)}
        data-testid="sort-controls-select"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortControls;

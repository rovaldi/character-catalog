import type { CharacterGender, CharacterStatus } from "@/api/types";
import type { FiltersProps } from "./types";
import { STATUS_OPTIONS, GENDER_OPTIONS } from "./constants";
import SelectFilter from "./SelectFilter";
import styles from "./Filters.module.scss";

const Filters = ({ filter, onFilterChange, onClear }: FiltersProps) => {
  const hasActiveFilters = Boolean(filter.status || filter.gender);

  return (
    <section
      className={styles.filters}
      aria-label="Filter characters"
      aria-controls="character-list"
      data-testid="filters"
    >
      <div className={styles.filters__fields}>
        <SelectFilter<CharacterStatus>
          label="Status"
          value={filter.status ?? ""}
          options={STATUS_OPTIONS}
          onChange={(value) => onFilterChange("status", value)}
          testId="filter-status"
        />
        <SelectFilter<CharacterGender>
          label="Gender"
          value={filter.gender ?? ""}
          options={GENDER_OPTIONS}
          onChange={(value) => onFilterChange("gender", value)}
          testId="filter-gender"
        />
      </div>
      <button
        type="button"
        className={styles.filters__clear}
        onClick={onClear}
        disabled={!hasActiveFilters}
        data-testid="filters-clear"
      >
        Clear filters
      </button>
    </section>
  );
};

export default Filters;

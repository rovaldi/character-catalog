import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useCharacters } from "@/api/queries";
import { useFilters } from "./useFilters";
import Filters from "@/components/Filters";
import SortControls from "@/components/SortControls";
import Pagination from "@/components/Pagination";
import CharacterCard from "@/components/CharacterCard";
import type { CharacterFilter } from "@/api/types";
import styles from "./ListingPage.module.scss";

const ListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { filter, updateFilter, clearFilters, sortField, setSortField, sortCharacters } =
    useFilters();

  const { characters, pageInfo, loading, error } = useCharacters({
    page,
    filter,
  });

  const sortedCharacters = useMemo(() => sortCharacters(characters), [characters, sortCharacters]);

  const setPage = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  const handleFilterChange = (key: keyof CharacterFilter, value: string) => {
    updateFilter(key, value);
    setSearchParams({ page: "1" });
  };

  const handleClearFilters = () => {
    clearFilters();
    setSearchParams({ page: "1" });
  };

  if (error) {
    return (
      <section
        className={styles.listingPage}
        aria-labelledby="error-heading"
        data-testid="listing-error"
      >
        <div className={styles.listingPage__error}>
          <h1 id="error-heading" className={styles.listingPage__errorTitle}>
            Error
          </h1>
          <p role="alert">Failed to load characters. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={styles.listingPage}
      aria-labelledby="characters-heading"
      data-testid="listing-page"
    >
      <header className={styles.listingPage__header}>
        <h1 id="characters-heading" className={styles.listingPage__title}>
          Characters
        </h1>
        <div className={styles.listingPage__controls}>
          <Filters
            filter={filter}
            onFilterChange={handleFilterChange}
            onClear={handleClearFilters}
          />
          <SortControls sortField={sortField} onSortFieldChange={setSortField} />
        </div>
      </header>

      {pageInfo && !loading && sortedCharacters.length > 0 && (
        <p
          className={styles.listingPage__count}
          role="status"
          aria-live="polite"
          data-testid="listing-count"
        >
          Showing {sortedCharacters.length} of {pageInfo.count} characters
        </p>
      )}

      <div
        className={styles.listingPage__gridContainer}
        aria-busy={loading}
        data-testid="listing-grid-container"
      >
        {loading ? (
          <div className={styles.listingPage__loading} data-testid="listing-loading">
            <p aria-live="polite" role="status">
              Loading characters...
            </p>
          </div>
        ) : sortedCharacters.length === 0 ? (
          <div className={styles.listingPage__empty} data-testid="listing-empty">
            <p role="status">No characters found with these filters.</p>
          </div>
        ) : (
          <ul
            id="character-list"
            className={styles.listingPage__grid}
            aria-label="Character list"
            data-testid="listing-grid"
          >
            {sortedCharacters.map((character) => (
              <li key={character.id}>
                <CharacterCard character={character} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {pageInfo && pageInfo.pages > 1 && (
        <Pagination currentPage={page} totalPages={pageInfo.pages} onPageChange={setPage} />
      )}
    </section>
  );
};

export default ListingPage;

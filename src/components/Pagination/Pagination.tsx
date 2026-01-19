import type { PaginationProps } from "./types";
import styles from "./Pagination.module.scss";

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav className={styles.pagination} aria-label="Pagination" data-testid="pagination">
      <button
        type="button"
        className={styles.pagination__button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        aria-label={`Go to previous page, page ${currentPage - 1}`}
        data-testid="pagination-prev"
      >
        ← Previous
      </button>
      <p className={styles.pagination__info} aria-live="polite" aria-atomic="true">
        Page{" "}
        <span
          className={styles.pagination__current}
          aria-current="page"
          data-testid="pagination-current"
        >
          {currentPage}
        </span>{" "}
        of <span data-testid="pagination-total">{totalPages}</span>
      </p>
      <button
        type="button"
        className={styles.pagination__button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        aria-label="Go to next page"
        data-testid="pagination-next"
      >
        Next →
      </button>
    </nav>
  );
};

export default Pagination;

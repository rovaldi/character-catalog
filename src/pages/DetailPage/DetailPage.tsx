import { useParams, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useCharacter } from "@/api/queries";
import styles from "./DetailPage.module.scss";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { character, loading, error } = useCharacter(id ?? "");

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <section
        className={styles.detailPage}
        aria-labelledby="loading-title"
        data-testid="detail-loading"
      >
        <h1 id="loading-title" className="visually-hidden">
          Loading
        </h1>
        <div className={styles.detailPage__loading}>
          <p role="status">Loading character details...</p>
        </div>
      </section>
    );
  }

  if (error || !character) {
    return (
      <section
        className={styles.detailPage}
        aria-labelledby="error-title"
        data-testid="detail-error"
      >
        <div className={styles.detailPage__error}>
          <h1 id="error-title" className={styles.detailPage__errorTitle}>
            Error
          </h1>
          <p role="alert">Character not found.</p>
          <button
            type="button"
            className={styles.detailPage__back}
            onClick={handleBack}
            data-testid="detail-back"
          >
            ← Back to list
          </button>
        </div>
      </section>
    );
  }

  const statusClass = classNames(styles.detailPage__status, {
    [styles["detailPage__status--alive"]]: character.status === "Alive",
    [styles["detailPage__status--dead"]]: character.status === "Dead",
  });

  return (
    <section
      className={styles.detailPage}
      aria-labelledby="character-name"
      data-testid="detail-page"
    >
      <nav aria-label="Back navigation">
        <button
          type="button"
          className={styles.detailPage__back}
          onClick={handleBack}
          data-testid="detail-back"
        >
          ← Back to list
        </button>
      </nav>

      <article className={styles.detailPage__content} data-testid="detail-content">
        <div className={styles.detailPage__imageWrapper}>
          <img
            src={character.image}
            alt={`Portrait of ${character.name}`}
            className={styles.detailPage__image}
            width={300}
            height={300}
            data-testid="detail-image"
          />
        </div>

        <div className={styles.detailPage__info}>
          <header className={styles.detailPage__header}>
            <h1 id="character-name" className={styles.detailPage__name} data-testid="detail-name">
              {character.name}
            </h1>
            <p className={statusClass} data-testid="detail-status">
              {character.status} — {character.species}
            </p>
          </header>

          <section aria-labelledby="details-heading">
            <h2 id="details-heading" className="visually-hidden">
              Character details
            </h2>
            <dl className={styles.detailPage__meta} data-testid="detail-meta">
              <dt className={styles.detailPage__metaLabel}>Gender</dt>
              <dd className={styles.detailPage__metaValue} data-testid="detail-gender">
                {character.gender}
              </dd>
              <dt className={styles.detailPage__metaLabel}>Origin</dt>
              <dd className={styles.detailPage__metaValue} data-testid="detail-origin">
                {character.origin.name}
              </dd>
              <dt className={styles.detailPage__metaLabel}>Location</dt>
              <dd className={styles.detailPage__metaValue} data-testid="detail-location">
                {character.location.name}
              </dd>
            </dl>
          </section>

          <section className={styles.detailPage__section} aria-labelledby="episodes-heading">
            <h2
              id="episodes-heading"
              className={styles.detailPage__sectionTitle}
              data-testid="detail-episodes-title"
            >
              Episodes ({character.episode.length})
            </h2>
            <ul className={styles.detailPage__episodes} data-testid="detail-episodes">
              {character.episode.map((ep) => (
                <li key={ep.id} className={styles.detailPage__episode}>
                  <span className={styles.detailPage__episodeCode} data-testid="episode-code">
                    {ep.episode}
                  </span>{" "}
                  <span className={styles.detailPage__episodeName} data-testid="episode-name">
                    {ep.name}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </section>
  );
};

export default DetailPage;

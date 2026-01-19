import { memo } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import type { CharacterCardProps } from "./types";
import styles from "./CharacterCard.module.scss";

const CharacterCard = memo(({ character }: CharacterCardProps) => {
  const statusClass = classNames(styles.characterCard__statusValue, {
    [styles["characterCard__statusValue--alive"]]: character.status === "Alive",
    [styles["characterCard__statusValue--dead"]]: character.status === "Dead",
  });

  return (
    <Link
      aria-label={`View ${character.name} details`}
      className={styles.characterCard}
      to={`/character/${character.id}`}
      data-testid={`character-card-${character.id}`}
    >
      <img
        src={character.image}
        alt=""
        className={styles.characterCard__image}
        width={300}
        height={300}
        loading="lazy"
        data-testid="character-card-image"
      />
      <h3 className={styles.characterCard__name}>{character.name}</h3>
      <dl className={styles.characterCard__meta}>
        <dt className={styles.characterCard__metaLabel}>Status</dt>
        <dd className={statusClass} data-testid="character-card-status">
          {character.status}
        </dd>
        <dt className={styles.characterCard__metaLabel}>Species</dt>
        <dd className={styles.characterCard__metaValue} data-testid="character-card-species">
          {character.species}
        </dd>
        <dt className={styles.characterCard__metaLabel}>Gender</dt>
        <dd className={styles.characterCard__metaValue} data-testid="character-card-gender">
          {character.gender}
        </dd>
      </dl>
    </Link>
  );
});

CharacterCard.displayName = "CharacterCard";

export default CharacterCard;

import { Outlet, Link } from "react-router-dom";
import styles from "./MainLayout.module.scss";

const MainLayout = () => {
  return (
    <div className={styles.mainLayout}>
      <header className={styles.mainLayout__header} role="banner">
        <Link to="/" className={styles.mainLayout__logo}>
          Rick & Morty
        </Link>
      </header>
      <main className={styles.mainLayout__content} role="main">
        <Outlet />
      </main>
      <footer className={styles.mainLayout__footer} role="contentinfo">
        <p>
          Data provided by{" "}
          <a href="https://rickandmortyapi.com" target="_blank" rel="noopener noreferrer">
            Rick and Morty API
          </a>
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;

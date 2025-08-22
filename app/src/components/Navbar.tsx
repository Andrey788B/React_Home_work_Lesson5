import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const location = useLocation();

  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.logo}>Rick and Morty Wiki</Link>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link
              to="/characters"
              className={location.pathname.startsWith('/characters') ? styles.active : ''}
            >
              Герои
            </Link>
          </li>
          <li>
            <Link
              to="/locations"
              className={location.pathname.startsWith('/locations') ? styles.active : ''}
            >
              Локации
            </Link>
          </li>
          <li>
            <Link
              to="/episodes"
              className={location.pathname.startsWith('/episodes') ? styles.active : ''}
            >
              Эпизоды
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
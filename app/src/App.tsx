import { Link, Outlet  } from 'react-router-dom';
import styles from './styles/app.module.css';

export default function App() {
  return (
    <main className={styles.heroWrapper}>
      <div className={styles.content}>
        <h1>Rick and Morty Wiki</h1>
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link to='/characters'>Герои</Link>
            </li>
            <li>
              <Link to='/locations'>Локации</Link>
            </li>
            <li>
              <Link to='/episodes'>Эпизоды</Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}

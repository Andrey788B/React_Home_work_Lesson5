import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from '../styles/Episode.module.css';
import data from '../../episode.json';

export default function Episode() {
  const { id } = useParams();
  const ep = data.find(x => String(x.id) === String(id));

  if (!ep) return <h2 className={styles.notFound}>Эпизод не найден</h2>;

  return (
    <>
      <Navbar />
      <section className={styles.episodeContainer}>
        <div className={styles.episodeCard}>
          <p className={styles.backLink}>
            <Link to='/episodes'>← Назад к списку</Link>
          </p>
          <h2>{ep.name}</h2>
          <ul>
            <li><strong>Дата выхода:</strong> {new Date(ep.air_date).toLocaleDateString()}</li>
            <li><strong>Код эпизода:</strong> {ep.episode}</li>
            <li><strong>Создан:</strong> {new Date(ep.created).toLocaleDateString()}</li>
          </ul>
        </div>
      </section>
    </>
  );
}
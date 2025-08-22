import { useLoaderData, useParams } from 'react-router';
import styles from '../styles/Location.module.css';

export async function loader() {
  const data = (await import('../../location.json')).default as any[];
  return data;
}

export default function Location() {
  const { id } = useParams();
  const list = useLoaderData<typeof loader>();
  const location = list.find(l => String(l.id) === id);

  if (!location) return <h2 className={styles.notFound}>Локация не найдена</h2>;

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.info}>
          <h2>{location.name}</h2>
          <ul>
            <li>
              <strong>Тип:</strong> {location.type || 'Нет данных'}
            </li>
            <li>
              <strong>Измерение:</strong> {location.dimension || 'Нет данных'}
            </li>
            <li>
              <strong>Создана:</strong>{' '}
              {new Date(location.created).toLocaleDateString()}
            </li>
          </ul>
        </div>
        <div className={styles.visual}>
          {/* Здесь можно вставить картинку или иллюстрацию, если будет */}
          <img
            src='/placeholder-location.png'
            alt={location.name}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}

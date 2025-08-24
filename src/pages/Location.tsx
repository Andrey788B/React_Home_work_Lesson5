"use client";

import { useLoaderData, useParams } from 'react-router';
import styles from '../assets/styles/Location.module.css';
// import Navbar from '../components/Navbar'; 


export async function loader() {
  const data = (await import('../context/location.json')).default as any[];
  return data;
}

export default function Location() {
  const { id } = useParams();
  const list = useLoaderData<typeof loader>();
  const location = list.find(l => String(l.id) === id);

  if (!location) return <h2 className={styles.notFound}>Локация не найдена</h2>;

  return (
    <>
      {/* <Navbar /> */}

        <section className={styles.Container}>
          <div className={styles.Card}>
            <div className={styles.Info}>
              <h2>{location.name}</h2>
              <ul>
                <li><strong>Тип:</strong> {location.type || 'Нет данных'}</li>
                <li><strong>Измерение:</strong> {location.dimension || 'Нет данных'}</li>
                <li><strong>Создана:</strong>{' '}{new Date(location.created).toLocaleDateString()}</li>
              </ul>
            </div>
            <div className={styles.Image}>
              src='/placeholder-location.png'
              alt={location.name}
              className={styles.image}
            </div>
          </div>
        </section>

    </>
  );
}

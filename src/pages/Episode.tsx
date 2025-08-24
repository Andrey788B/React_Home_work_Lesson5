"use client";

import { useParams } from 'react-router';
// import Navbar from '../components/Navbar';
import styles from '../assets/styles/Episode.module.css';
import data from '../context/episode.json';


export default function Episode() {
  const { id } = useParams();
  const ep = data.find(x => String(x.id) === String(id));

  if (!ep) return <h2 className={styles.notFound}>Эпизод не найден</h2>;

  return (
    <>
      {/* <Navbar /> */}

        <section className={styles.Container}>
          <div className={styles.Card}>
            <div className={styles.Info}>
              <h2>{ep.name}</h2>
              <ul>
                <li><strong>Дата выхода:</strong> {new Date(ep.air_date).toLocaleDateString()}</li>
                <li><strong>Код эпизода:</strong> {ep.episode}</li>
                <li><strong>Создан:</strong> {new Date(ep.created).toLocaleDateString()}</li>
              </ul>
            </div>
            <div className={styles.Image}>
              src='/episode.png'
              className={styles.image}
            </div>
          </div>
        </section>

    </>
  );

}
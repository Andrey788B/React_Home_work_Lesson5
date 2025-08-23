"use client";

import { Link, useLoaderData } from 'react-router';
import { useSearchParams } from 'react-router-dom';
// import Navbar from '../components/Navbar';
import styles from '../styles/Episodes.module.css';
import PrivateRoute from "../components/PrivateRoute"; 

export async function loader() {
  const data = (await import('../../episode.json')).default as any[];
  return data;
}

export default function Episodes() {
  const list = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get('sort') || 'air_dateASC';

  const sortedList = [...list].sort((a, b) => {
    switch (sortParam) {
      case 'nameASC':
        return a.name.localeCompare(b.name);
      case 'nameDESC':
        return b.name.localeCompare(a.name);
      case 'air_dateASC':
        return new Date(a.air_date).getTime() - new Date(b.air_date).getTime();
      case 'air_dateDESC':
        return new Date(b.air_date).getTime() - new Date(a.air_date).getTime();
      default:
        return 0;
    }
  });

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSearchParams({ sort: e.target.value });
  }

  return (
    <PrivateRoute>
      {/* <Navbar /> */}
      <section className={styles.container}>
        <div className={styles.header}>
          <select value={sortParam} onChange={handleSortChange} className={styles.select}>
            <option value="air_dateASC">Дата выхода ↑</option>
            <option value="air_dateDESC">Дата выхода ↓</option>
            <option value="nameASC">Название A→Z</option>
            <option value="nameDESC">Название Z→A</option>
          </select>
        </div>

        <ul className={styles.list}>
          {sortedList.map((e) => (
            <li key={e.id} className={styles.card}>
              <Link to={`/episodes/${e.id}`} className={styles.cardContent}>
                <h3>{e.name}</h3>
                <p>Дата выхода: {new Date(e.air_date).toLocaleDateString()}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PrivateRoute>
  );
}
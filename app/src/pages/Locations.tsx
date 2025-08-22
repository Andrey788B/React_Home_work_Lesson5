import { Link, useLoaderData } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import styles from '../styles/Locations.module.css';

export async function loader() {
  const data = (await import('../../location.json')).default as any[];
  return data;
}

export default function Locations() {
  const list = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get('sort') || 'nameASC';

  const sortedList = [...list].sort((a, b) => {
    switch (sortParam) {
      case 'nameASC':
        return a.name.localeCompare(b.name);
      case 'nameDESC':
        return b.name.localeCompare(a.name);
      case 'createdASC':
        return new Date(a.created).getTime() - new Date(b.created).getTime();
      case 'createdDESC':
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      default:
        return 0;
    }
  });

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSearchParams({ sort: e.target.value });
  }

  return (
    <>
      <Navbar />
      <section className={styles.container}>
        <div className={styles.header}>
          <h2>Локации</h2>
          <select value={sortParam} onChange={handleSortChange} className={styles.select}>
            <option value="nameASC">Название A→Z</option>
            <option value="nameDESC">Название Z→A</option>
            <option value="createdASC">Дата создания ↑</option>
            <option value="createdDESC">Дата создания ↓</option>
          </select>
        </div>

        <ul className={styles.list}>
          {sortedList.map((l) => (
            <li key={l.id} className={styles.card}>
              <Link to={`/locations/${l.id}`} className={styles.cardContent}>
                <h3>{l.name}</h3>
                <p>Создана: {new Date(l.created).toLocaleDateString()}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
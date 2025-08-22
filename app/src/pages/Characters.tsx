import { Link, useLoaderData } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import styles from '../styles/Characters.module.css';

export async function loader() {
  const data = (await import('../../characters.json')).default as any[];
  return data;
}

export default function Characters() {
  const list = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get('sort') || 'createdASC';

  const sortedList = [...list].sort((a, b) => {
    switch (sortParam) {
      case 'createdASC':
        return new Date(a.created).getTime() - new Date(b.created).getTime();
      case 'createdDESC':
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      case 'nameASC':
        return a.name.localeCompare(b.name);
      case 'nameDESC':
        return b.name.localeCompare(a.name);
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
          <h2>Герои</h2>
          <select
            value={sortParam}
            onChange={handleSortChange}
            className={styles.select}
          >
            <option value='createdASC'>Дата создания ↑</option>
            <option value='createdDESC'>Дата создания ↓</option>
            <option value='nameASC'>Имя A→Z</option>
            <option value='nameDESC'>Имя Z→A</option>
          </select>
        </div>

        <ul className={styles.list}>
          {sortedList.map(c => (
            <li key={c.id} className={styles.card}>
              <Link to={`/characters/${c.id}`} className={styles.cardContent}>
                <h3>{c.name}</h3>
                <p>Создан: {new Date(c.created).toLocaleDateString()}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

import { useLoaderData, useParams } from 'react-router';
// import Navbar from '../components/Navbar'; 
import styles from "../styles/Character.module.css";


export async function loader() {
  const data = (await import('../../characters.json')).default as any[];
  return data;
}

export default function Character() {
  const { id } = useParams();
  const list = useLoaderData<typeof loader>();
  const hero = list.find(c => String(c.id) === id);

  if (!hero) return (
    <>
      {/* <Navbar /> */}
      <h2 className={styles.notFound}>Герой не найден</h2>
    </>
  );

  return (
    <>
      {/* <Navbar /> */}
      
        <section className={styles.Container}>
          <div className={styles.Card}>
            <div className={styles.Info}>
              <h2>{hero.name}</h2>
              <ul>
                <li><strong>Создан:</strong> {new Date(hero.created).toLocaleDateString()}</li>
                <li><strong>Статус:</strong> {hero.status || 'Нет данных'}</li>
                <li><strong>Вид:</strong> {hero.species || 'Нет данных'}</li>
                <li><strong>Тип:</strong> {hero.type || 'Нет данных'}</li>
                <li><strong>Пол:</strong> {hero.gender || 'Нет данных'}</li>
              </ul>
            </div>
            <div className={styles.Image}>
              <img src={hero.image} alt={hero.name} />
            </div>
          </div>
        </section>

    </>
  );
}
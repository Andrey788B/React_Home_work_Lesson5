import { Link } from 'react-router-dom'; // используй тот же импорт, что и в Characters
import data from '../../location.json';

export default function Locations() {
  return (
    <section>
      <h2>Локации</h2>
      <ul>
        {data.map((l) => (
          <li key={l.id}>
            <Link to={`/locations/${l.id}`}>{l.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
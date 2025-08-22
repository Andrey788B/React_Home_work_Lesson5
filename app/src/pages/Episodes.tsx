import { Link } from 'react-router-dom';
import data from '../../episode.json';

export default function Episodes() {
  return (
    <section>
      <h2>Эпизоды</h2>
      <ul>
        {data.map((e) => (
          <li key={e.id}>
            <Link to={`/episodes/${e.id}`}>{e.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
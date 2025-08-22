import { useParams, Link } from 'react-router-dom';
import data from '../../episode.json';

export default function Episode() {
  const { id } = useParams();
  const ep = data.find(x => String(x.id) === String(id));

  if (!ep) return <h2>Эпизод не найден</h2>;

  return (
    <section>
      <p>
        <Link to='/episodes'>← Назад к списку</Link>
      </p>
      <h2>{ep.name}</h2>
      <pre>{JSON.stringify(ep, null, 2)}</pre>
    </section>
  );
}

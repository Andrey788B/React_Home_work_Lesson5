import { useParams, Link } from 'react-router-dom';
import data from '../../location.json';

export default function Location() {
  const { id } = useParams();
  const loc = data.find((x) => String(x.id) === String(id));

  if (!loc) return <h2>Локация не найдена</h2>;

  return (
    <section>
      <p><Link to="/locations">← Назад к списку</Link></p>
      <h2>{loc.name}</h2>
      <pre>{JSON.stringify(loc, null, 2)}</pre>
    </section>
  );
}
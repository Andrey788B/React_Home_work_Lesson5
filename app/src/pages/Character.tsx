import { useParams } from 'react-router-dom';
import data from '../../characters.json';

export default function Character() {
  const { id } = useParams();
  const character = data.find(c => c.id.toString() === id);

  if (!character) return <h2>Персонаж не найден</h2>;

  return (
    <div>
      <h2>{character.name}</h2>
      <p>Статус: {character.status}</p>
      <p>Вид: {character.species}</p>
      <p>Пол: {character.gender}</p>
    </div>
  );
}

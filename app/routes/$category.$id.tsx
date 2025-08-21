import { useParams, Link } from "react-router-dom";

export default function Detail() {
  const { category, id } = useParams();

  return (
    <div>
      <h2>Деталь {id} из категории {category}</h2>
      <Link to={`/${category}`}>Назад к списку</Link>
    </div>
  );
}
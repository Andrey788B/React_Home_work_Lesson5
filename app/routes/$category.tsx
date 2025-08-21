import { useParams, Link } from "react-router-dom";

export default function Category() {
  const { category } = useParams();
  const items = [1, 2, 3]; // временные данные

  return (
    <div>
      <h2>Категория: {category}</h2>
      <ul>
        {items.map((id) => (
          <li key={id}>
            <Link to={`/${category}/${id}`}>Деталь {id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
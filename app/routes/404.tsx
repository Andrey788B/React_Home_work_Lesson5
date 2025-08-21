import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h2>404 — Страница не найдена</h2>
      <Link to="/">На главную</Link>
    </div>
  );
}
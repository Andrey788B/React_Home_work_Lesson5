import { useLoaderData } from "react-router";
import { useSearchParams } from "react-router-dom";

export async function loader() {
  const data = (await import("../../characters.json")).default as any[];
  return data;
}

export default function Characters() {
  const list = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Берём параметр сортировки из URL или ставим по умолчанию "createdASC"
  const sortParam = searchParams.get("sort") || "createdASC";

  // Сортировка на основе выбранного параметра
  const sortedList = [...list].sort((a, b) => {
    switch (sortParam) {
      case "createdASC":
        return new Date(a.created).getTime() - new Date(b.created).getTime();
      case "createdDESC":
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      case "nameASC":
        return a.name.localeCompare(b.name);
      case "nameDESC":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Обновляем параметр сортировки в URL
  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSearchParams({ sort: e.target.value });
  }

  return (
    <section style={{ padding: "1rem" }}>
      <h2>Герои</h2>

      {/* Выпадающий список для выбора сортировки */}
      <select value={sortParam} onChange={handleSortChange}>
        <option value="createdASC">Дата создания ↑</option>
        <option value="createdDESC">Дата создания ↓</option>
        <option value="nameASC">Имя A→Z</option>
        <option value="nameDESC">Имя Z→A</option>
      </select>

      <ul>
        {sortedList.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </section>
  );
}
import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ padding: 20 }}>
      <h1>React Router Homework</h1>
      <nav style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <NavLink to="/" end>Главная</NavLink>
        <NavLink to="/characters">Герои</NavLink>
        <NavLink to="/locations">Локации</NavLink>
        <NavLink to="/episodes">Эпизоды</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
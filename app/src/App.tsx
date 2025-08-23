"use client";

import { NavLink, Outlet } from "react-router-dom";
import styles from "./styles/app.module.css";
import { AuthProvider, useAuth } from "./context/AuthContext";

function Shell() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <main className={styles.heroWrapper}>
      <div className={styles.content}>
        {isAuthenticated ? (
          <>
            <h1>Rick and Morty Wiki</h1>
            <nav>
              <ul className={styles.navList}>
                <li><NavLink to="/" end className={({isActive})=> isActive ? "active" : ""}>Главная</NavLink></li>
                <li><NavLink to="/characters" className={({isActive})=> isActive ? "active" : ""}>Герои</NavLink></li>
                <li><NavLink to="/locations"  className={({isActive})=> isActive ? "active" : ""}>Локации</NavLink></li>
                <li><NavLink to="/episodes"   className={({isActive})=> isActive ? "active" : ""}>Эпизоды</NavLink></li>
                <li><button onClick={logout} className={styles.logoutBtn}>Выйти</button></li>
              </ul>
            </nav>
            <Outlet />
          </>
        ) : (
          // Неавторизован: показываем только страницы /signin и /signup
          <Outlet />
        )}
      </div>
    </main>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}
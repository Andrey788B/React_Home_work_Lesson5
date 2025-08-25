"use client";
import { Suspense } from "react";
import Spinner from "./components/Spinner";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./assets/styles/App.module.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { MantineProvider } from "@mantine/core";
import { Button, Title } from "@mantine/core";


function Shell() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <main className={styles.heroWrapper}>
      <div className={styles.content}>
        {isAuthenticated ? (
          <>
            <Title order={1}>Rick and Morty Wiki</Title>
            <nav>
              <ul className={styles.navList}>
                <li><NavLink to="/" end className={({isActive})=> isActive ? "active" : ""}>Главная</NavLink></li>
                <li><NavLink to="/characters" className={({isActive})=> isActive ? "active" : ""}>Герои</NavLink></li>
                <li><NavLink to="/locations"  className={({isActive})=> isActive ? "active" : ""}>Локации</NavLink></li>
                <li><NavLink to="/episodes"   className={({isActive})=> isActive ? "active" : ""}>Эпизоды</NavLink></li>
                <li><Button variant="light" color="red" onClick={logout}>Выйти</Button></li>
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
    <MantineProvider withGlobalStyles withNormalizeCSS> 
      <AuthProvider>
        <Suspense fallback={<Spinner />}>
          <Shell />
        </Suspense>
      </AuthProvider>
    </MantineProvider>
  );
}
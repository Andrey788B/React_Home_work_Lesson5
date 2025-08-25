"use client";

import { Suspense, useEffect } from "react";
import { useLocation, useNavigate, Outlet, NavLink } from "react-router-dom";
import { MantineProvider, Button, Title } from "@mantine/core";
import Spinner from "./components/Spinner";
import styles from "./assets/styles/App.module.css";
import { AuthProvider, useAuth } from "./context/AuthContext";

function Shell() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isPublicPage =
      location.pathname.startsWith("/signin") ||
      location.pathname.startsWith("/signup");

    if (!isAuthenticated && !isPublicPage) {
      navigate("/signin", { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <main className={styles.heroWrapper}>
      <div className={styles.content}>
        {isAuthenticated ? (
          <>
            <Title order={1}>Rick and Morty Wiki</Title>
            <nav>
              <ul className={styles.navList}>
                <li><NavLink to="/"end className={({ isActive }) => (isActive ? "active" : "")}>Главная</NavLink></li>
                <li><NavLink to="/characters" className={({ isActive }) => (isActive ? "active" : "")}>Герои</NavLink></li>
                <li><NavLink to="/locations" className={({ isActive }) => (isActive ? "active" : "")}>Локации</NavLink></li>
                <li><NavLink to="/episodes" className={({ isActive }) => (isActive ? "active" : "")}>Эпизоды</NavLink></li>
                <li><Button variant="light" color="red" onClick={logout}>Выйти</Button></li>
              </ul>
            </nav>
            <Outlet />
          </>
        ) : (
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
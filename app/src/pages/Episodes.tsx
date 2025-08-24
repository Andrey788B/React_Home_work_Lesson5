"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Episodes.module.css";
import type { Episode } from "../types/Episode";
import PrivateRoute from "../components/PrivateRoute";
import PageErrorBoundary from "../components/PageErrorBoundary";
import Spinner from "../components/Spinner";
import Bomb from "../components/Bomb";

export default function Episodes() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldCrash, setShouldCrash] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 20;
      if (bottom && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    if (!hasMore || loading) return;

    const fetchEpisodes = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `https://rickandmortyapi.com/api/episode?page=${page}`
        );
        setEpisodes((prev) => [...prev, ...res.data.results]);
        setHasMore(res.data.info.next !== null);
      } catch (err) {
        setError("Ошибка загрузки данных с сервера");
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [page]);

  return (
    <PageErrorBoundary variant="episodes">
      <PrivateRoute>
        <section className={styles.container}>

          <button onClick={() => setShouldCrash(true)} className={styles.select}>💣 Взорвать компонент</button>

          {shouldCrash ? (
            <Bomb />
          ) : (
            <ul className={styles.list}>
              {episodes.map((e) => (
                <li key={e.id} className={styles.card}>
                  <Link to={`/episodes/${e.id}`} className={styles.cardContent}>
                    <h3>{e.name}</h3>
                    <p>Дата выхода: {new Date(e.air_date).toLocaleDateString()}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {loading && <Spinner />}
          {error && <p className={styles.error}>{error}</p>}
        </section>
      </PrivateRoute>
    </PageErrorBoundary>
  );
}

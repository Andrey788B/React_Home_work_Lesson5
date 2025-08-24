"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Locations.module.css";
import type { Location } from "../types/Location";
import PrivateRoute from "../components/PrivateRoute";
import PageErrorBoundary from "../components/PageErrorBoundary";
import Spinner from "../components/Spinner";
import Bomb from "../components/Bomb";

export default function Locations() {
  const [locations, setLocations] = useState<Location[]>([]);
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

    const fetchLocations = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `https://rickandmortyapi.com/api/location?page=${page}`
        );
        setLocations((prev) => [...prev, ...res.data.results]);
        setHasMore(res.data.info.next !== null);
      } catch (err) {
        setError("Ошибка загрузки данных с сервера");
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [page]);

  return (
    <PageErrorBoundary variant="locations">
      <PrivateRoute>
        <section className={styles.container}>

          <button onClick={() => setShouldCrash(true)} className={styles.select}>💣 Взорвать компонент</button>

          {shouldCrash ? (
            <Bomb />
          ) : (
            <ul className={styles.list}>
              {locations.map((l) => (
                <li key={l.id} className={styles.card}>
                  <Link to={`/locations/${l.id}`} className={styles.cardContent}>
                    <h3>{l.name}</h3>
                    <p>Тип: {l.type}</p>
                    <p>Измерение: {l.dimension}</p>
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

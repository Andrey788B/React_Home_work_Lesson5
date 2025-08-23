"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/auth.module.css";

export default function Signup() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim()) return;
    if (password1 !== password2) return;
    // имитация регистрации: сразу авторизуем и возвращаем на главную
    login(username.trim());
  }

  return (
    <section className={styles.authCard}>
      <h2 className={styles.title}>Регистрация</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Логин
          <input
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Придумайте логин"
          />
        </label>

        <label className={styles.label}>
          Пароль
          <input
            className={styles.input}
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            placeholder="Введите пароль"
          />
        </label>

        <label className={styles.label}>
          Повторите пароль
          <input
            className={styles.input}
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Повторите пароль"
          />
        </label>

        <button className={styles.button} type="submit">Зарегистрироваться</button>
      </form>

      <p className={styles.helper}>
        Уже есть аккаунт?{" "}
        <Link to="/signin" className={styles.link}>Войдите</Link>
      </p>
    </section>
  );
}
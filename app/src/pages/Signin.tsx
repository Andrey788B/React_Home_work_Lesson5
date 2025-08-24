"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/auth.module.css";


export default function Signin() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // имитация

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim()) return; 
    
    login(username.trim());
  }

  return (

      <section className={styles.authCard}>
        <h2 className={styles.title}>Вход</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Логин
            <input
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите логин"
            />
          </label>

          <label className={styles.label}>
            Пароль
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
            />
          </label>

          <button className={styles.button} type="submit">Войти</button>
        </form>

        <p className={styles.helper}>
          Нет аккаунта?{" "}
          <Link to="/signup" className={styles.link}>Зарегистрируйтесь</Link>
        </p>
      </section>

  );
}
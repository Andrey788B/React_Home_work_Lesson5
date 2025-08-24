"use client";
import styles from "../assets/styles/Spinner.module.css";

export default function Spinner() {
  return (
    <div className={styles.box}>
      <div className={styles.ring} />
    </div>
  );
}
"use client";
import { Component } from "react";
import type { ReactNode } from "react";
import styles from "../assets/styles/Error-boundary.module.css";
import { withNavigation } from "./WithNavigation"; 

type Variant = "characters" | "locations" | "episodes" | "default";

type Props = {
  children: ReactNode;
  variant?: Variant;
  navigate?: (path: string) => void; 
};

type State = { hasError: boolean; message?: string };

class PageErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(err: unknown): State {
    return { hasError: true, message: err instanceof Error ? err.message : "Неизвестная ошибка" };
  }

  handleRetry = () => {
    if (this.props.navigate) {
      this.props.navigate("/"); 
    } else {
      this.setState({ hasError: false, message: undefined });
    }
  };

  render() {
    if (this.state.hasError) {
      const { variant = "default" } = this.props;
      let title = "Ошибка на странице";
      let helper = "Попробуйте обновить страницу";

      switch (variant) {
        case "characters":
          title = "Проблема при загрузке героев";
          helper = "Rick и Morty пока отдыхают. Обновите страницу позже!";
          break;
        case "episodes":
          title = "Эпизоды не прогрузились";
          helper = "Видимо, портал сломался. Попробуйте снова!";
          break;
        case "locations":
          title = "Локации недоступны";
          helper = "Где-то в Мультивселенной сбой. Обновите страницу.";
          break;
      }

      return (
        <div className={styles.pageWrapper}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.message}>{helper}</p>
          {this.state.message && <p className={styles.details}>{this.state.message}</p>}
          <button className={styles.retryBtn} onClick={this.handleRetry}>
            Обновить
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default withNavigation(PageErrorBoundary);
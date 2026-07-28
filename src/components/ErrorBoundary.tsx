import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import styles from "./ErrorBoundary.module.css";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/** Top-level safety net: if a render throws, show a recoverable fallback instead
 *  of a blank white screen. Progress is stored separately, so a reload is safe. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Surfaced in the console for debugging; no external reporting by design.
    if (import.meta.env.DEV) console.error("Unhandled UI error:", error, info);
  }

  render(): ReactNode {
    if (!this.state.error) return this.props.children;
    return (
      <div className={styles.wrap} role="alert">
        <div className={styles.card}>
          <div className={styles.mark}>!</div>
          <h1>Something went wrong</h1>
          <p>The app hit an unexpected error. Your saved progress is safe — reloading usually fixes it.</p>
          <div className={styles.actions}>
            <button className={styles.primary} onClick={() => window.location.reload()}>Reload the app</button>
            <button className={styles.ghost} onClick={() => this.setState({ error: null })}>Try again</button>
          </div>
        </div>
      </div>
    );
  }
}

import { Component, type ErrorInfo, type PropsWithChildren } from 'react';
export class ErrorBoundary extends Component<PropsWithChildren, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(_error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error('Render failed:', info.componentStack);
  }
  render() {
    if (this.state.failed)
      return (
        <main className="error-page" role="alert">
          <h1>No pudimos cargar el portafolio</h1>
          <p>Intenta recargar la página.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </main>
      );
    return this.props.children;
  }
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import { Providers } from './providers';
import { ErrorBoundary } from '../components/shared/ErrorBoundary';
import App from './App.tsx';
import '../config/i18n.ts';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Providers>
        <App />
      </Providers>
    </ErrorBoundary>
  </StrictMode>,
);

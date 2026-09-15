import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes.jsx';
import { ErrorBoundary } from './components/common/ErrorBoundary.jsx';
import { PharmacyProvider } from './context/PharmacyContext.jsx';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <PharmacyProvider>
          <AppRoutes />
        </PharmacyProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}


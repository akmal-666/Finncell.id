import React from 'react';
import { AppRouter } from './router';
import { ToastProvider } from './components/ui/Toast';

export function App() {
  return (
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  );
}

export default App;

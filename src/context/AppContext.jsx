import { createContext, useContext } from 'react';
import { useAppState } from '../hooks/useAppState';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const state = useAppState();
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

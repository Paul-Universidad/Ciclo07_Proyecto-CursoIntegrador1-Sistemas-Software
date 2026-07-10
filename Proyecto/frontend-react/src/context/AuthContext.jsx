import { createContext, useContext, useMemo, useState } from 'react';

const STORAGE_KEY = 'pharmly_user';

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const value = useMemo(
    () => ({
      user,
      login(userData) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        setUser(userData);
      },
      logout() {
        sessionStorage.removeItem(STORAGE_KEY);
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }
  return ctx;
}

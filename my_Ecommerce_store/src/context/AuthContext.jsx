/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo } from 'react';
import { storageKeys } from '../utils/constants.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage(storageKeys.auth, null);

  const login = useCallback((credentials) => {
    const nextUser = {
      name: credentials.email.split('@')[0],
      email: credentials.email,
    };
    setUser(nextUser);
    return nextUser;
  }, [setUser]);

  const register = useCallback((formData) => {
    const nextUser = {
      name: formData.name,
      email: formData.email,
    };
    setUser(nextUser);
    return nextUser;
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  // useMemo keeps the context value stable so consumers avoid avoidable re-renders.
  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, register, logout }),
    [user, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../../types/auth';
import { auth } from '../../utils/auth';

interface AuthContextType extends AuthState {
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: auth.isAuthenticated()
  });

  const login = (user: User) => {
    setAuthState({ user, isAuthenticated: true });
  };

  const logout = () => {
    auth.logout();
    setAuthState({ user: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
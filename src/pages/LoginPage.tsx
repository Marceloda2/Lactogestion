import React, { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { auth } from '../utils/auth';
import { useAuth } from '../components/auth/AuthProvider';
import { LoginCredentials } from '../types/auth';

export function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState<string>();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setError(undefined);
      const user = await auth.login(credentials);
      login(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen bg-secondary-yellow/10 flex items-center justify-center p-4">
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  );
}
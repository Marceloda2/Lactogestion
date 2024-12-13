import React, { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { auth } from '../utils/auth';
import { useAuth } from '../components/auth/AuthProvider';
import { LoginCredentials } from '../types/auth';
import Icon from '/icon.svg'; // Adjust the path as necessary

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
    <div className="min-h-screen bg-secondary-yellow/10 flex flex-col items-center justify-center p-4">
      <img src={Icon} alt="Login Icon" className="w-40 h-40 mb-6" />
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  );
}

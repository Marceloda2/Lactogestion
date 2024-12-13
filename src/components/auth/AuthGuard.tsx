import React from 'react';
import { useAuth } from './AuthProvider';

interface AuthGuardProps {
  requiredRole?: 'admin' | 'user';
  children: React.ReactNode;
}

export function AuthGuard({ requiredRole, children }: AuthGuardProps) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    return (
      <div className="p-4 text-accent-red bg-accent-red/10 rounded">
        No tiene permisos para acceder a esta sección
      </div>
    );
  }

  return <>{children}</>;
}
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { LoginCredentials } from '../../types/auth';

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  error?: string;
}

export function LoginForm({ onSubmit, error }: LoginFormProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(credentials);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <form onSubmit={handleSubmit} className="bg-primary-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary-navy">LactoGestion</h2>
          <p className="text-accent-black">Inicie sesión para continuar</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-3 bg-accent-red/10 text-accent-red rounded"
          >
            {error}
          </motion.div>
        )}

        <div className="mb-4">
          <label className="block text-primary-navy text-sm font-bold mb-2" htmlFor="username">
            Usuario
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="w-full px-3 py-2 border border-accent-gray rounded focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
            value={credentials.username}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-primary-navy text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full px-3 py-2 border border-accent-gray rounded focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-primary-navy text-primary-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center gap-2"
        >
          <LogIn size={20} />
          Iniciar Sesión
        </motion.button>
      </form>
    </motion.div>
  );
}
import { User } from '../types/auth';

export const MOCK_USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123', // In a real app, passwords would be hashed
    role: 'admin',
  },
  {
    id: 2,
    username: 'usuario',
    password: 'user123',
    role: 'user',
  },
] as const;

export const findUser = (username: string, password: string): User | null => {
  const user = MOCK_USERS.find(
    (u) => u.username === username && u.password === password
  );
  
  if (!user) return null;
  
  // Don't send password to client
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
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
  {
    id: 3,
    username: 'Marco',
    password: '123',
    role: 'user',
  },
  {
  id: 4,
  username: 'Marcelo',
  password: '123',
  role: 'user',
},
] as const;

// Almacenar productores con sus credenciales
let producerUsers: Array<{
  id: number;
  username: string;
  password: string;
  role: string;
}> = [];

export const addProducerUser = (username: string, password: string) => {
  const newUser = {
    id: MOCK_USERS.length + producerUsers.length + 1,
    username,
    password,
    role: 'user',
  };
  producerUsers.push(newUser);
  return newUser;
};

export const findUser = (username: string, password: string): User | null => {
  // Buscar en usuarios mock y productores
  const user = [...MOCK_USERS, ...producerUsers].find(
    (u) => u.username === username && u.password === password
  );
  
  if (!user) return null;
  
  // Don't send password to client
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
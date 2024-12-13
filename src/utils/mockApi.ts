import { LoginCredentials } from '../types/auth';
import { findUser } from './mockUsers';

export const mockApiService = {
  login: async (credentials: LoginCredentials) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = findUser(credentials.username, credentials.password);
    
    if (!user) {
      throw new Error('Credenciales inválidas');
    }
    
    // Generate mock token
    const token = btoa(`${user.username}:${Date.now()}`);
    
    return {
      data: [{
        user,
        token
      }]
    };
  }
};
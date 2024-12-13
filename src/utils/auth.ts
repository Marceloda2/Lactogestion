import { apiService } from './apiuser';
import { User, LoginCredentials } from '../types/auth';

export const AUTH_TOKEN_KEY = 'auth_token';

export const auth = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    try {
      const response = await apiService.login(credentials);
      const { token, user } = response.data[0];
      
      if (!token || !user) {
        throw new Error('Invalid response from server');
      }
      
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Usuario o contraseña incorrectos');
    }
  },

  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  },

  getToken: (): string | null => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
};
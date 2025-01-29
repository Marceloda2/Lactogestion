import axios from 'axios';
import { logError } from './errorHandling';
import { LoginCredentials } from '../types/auth';
import { mockApiService } from './mockApi';
import { addProducerUser } from './mockUsers';

const API_URL = 'http://localhost:5000/api';

interface ApiResponse<T> {
  data: T[];
  error?: string;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add authentication interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const handleError = (error: unknown): ApiResponse<any> => {
  const message = error instanceof Error ? error.message : 'An unknown error occurred';
  logError('API', error);
  return { data: [], error: message };
};

const transformResponse = <T>(data: any[]): T[] => {
  if (!Array.isArray(data)) {
    logError('Data Transform', 'Invalid data format received');
    return [];
  }
  return data;
};

export const apiService = {
  // Auth
  login: mockApiService.login,

  // Producers
  addProducer: async (producerData: any) => {
    // Crear credenciales de usuario para el productor
    const user = addProducerUser(producerData.codigo, producerData.password);
    
    // Simular respuesta de API
    return {
      data: [{
        id: user.id,
        codigo: producerData.codigo,
        nombre: producerData.nombre,
        telefono: producerData.telefono,
      }]
    };
  },

  // Rest of the API methods...
  getProducers: mockApiService.getProducers,
  getReceptions: mockApiService.getReceptions,
  getDispatches: mockApiService.getDispatches,
  addReception: mockApiService.addReception,
  addDispatch: mockApiService.addDispatch,
};

export { api };
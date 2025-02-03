import axios from 'axios';
import { logError } from './errorHandling';
const API_URL = 'http://localhost:5000/api';

interface ApiResponse<T> {
  data: T[];
  error?: string;
}
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
const api = {
  // Inventory
  getInventory: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await axios.get(`${API_URL}/inventario`);
      return { data: transformResponse(response.data) };
    } catch (error) {
      return handleError(error);
    }
  },
  addInventory: async (data: any): Promise<ApiResponse<any>> => {
    try {
      const response = await axios.post(`${API_URL}/inventario`, data);
      return { data: [response.data] };
    } catch (error) {
      return handleError(error);
    }
  },

  // Producers
  getProducers: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await axios.get(`${API_URL}/productores`);
      return { data: transformResponse(response.data) };
    } catch (error) {
      return handleError(error);
    }
  },
  addProducer: async (data: any): Promise<ApiResponse<any>> => {
    try {
      const response = await axios.post(`${API_URL}/productores`, data);
      return { data: [response.data] };
    } catch (error) {
      return handleError(error);
    }
  },

  // Dispatch
  getDispatches: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await axios.get(`${API_URL}/despacho`);
      return { data: transformResponse(response.data) };
    } catch (error) {
      return handleError(error);
    }
  },
  addDispatch: async (data: any): Promise<ApiResponse<any>> => {
    try {
      const response = await axios.post(`${API_URL}/despacho`, data);
      return { data: [response.data] };
    } catch (error) {
      return handleError(error);
    }
  },

  // Reception
  getReceptions: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await axios.get(`${API_URL}/recepcion`);
      return { data: transformResponse(response.data) };
    } catch (error) {
      return handleError(error);
    }
  },
  addReception: async (data: any): Promise<ApiResponse<any>> => {
    try {
      const response = await axios.post(`${API_URL}/recepcion`, data);
      return { data: [response.data] };
    } catch (error) {
      return handleError(error);
    }
  },
  deleteReception: async (id: number): Promise<ApiResponse<any>> => {
    try {
      const response = await axios.delete(`${API_URL}/recepcion/${id}`);
      return { data: [response.data] };
    } catch (error) {
      return handleError(error);
    }
  },

  // Rejections
  getRejections: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await axios.get(`${API_URL}/rechazos`);
      return { data: transformResponse(response.data) };
    } catch (error) {
      return handleError(error);
    }
  },
  addRejection: async (data: any): Promise<ApiResponse<any>> => {
    try {
      const response = await axios.post(`${API_URL}/rechazos`, data);
      return { data: [response.data] };
    } catch (error) {
      return handleError(error);
    }
  },
  
  
};

export default api;
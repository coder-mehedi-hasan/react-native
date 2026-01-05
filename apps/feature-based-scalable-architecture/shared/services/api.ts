import axios, { AxiosInstance } from 'axios';
import { storage } from './storage';

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api.foodie.local', // Mock API endpoint
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.instance.interceptors.request.use(async config => {
      const token = await storage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  getClient() {
    return this.instance;
  }

  setAuthToken(token: string) {
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  clearAuthToken() {
    delete this.instance.defaults.headers.common['Authorization'];
  }
}

export const apiClient = new ApiClient();
export const api = apiClient.getClient();

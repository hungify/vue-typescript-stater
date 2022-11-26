import type { App } from 'vue';
import axios, { type AxiosRequestConfig } from 'axios';

export const setupHttp = (app: App) => {
  app.config.globalProperties.$http = {
    get: (endpoint: string, config?: AxiosRequestConfig) => axios.get(endpoint, config),
    post: <T>(endpoint: string, data?: T, config?: AxiosRequestConfig) =>
      axios.post(endpoint, data, config),
    put: <T>(endpoint: string, data?: T, config?: AxiosRequestConfig) =>
      axios.put(endpoint, data, config),
    patch: <T>(endpoint: string, data?: T, config?: AxiosRequestConfig) =>
      axios.patch(endpoint, data, config),
    delete: (endpoint: string, config?: AxiosRequestConfig) => axios.delete(endpoint, config),
  };
};

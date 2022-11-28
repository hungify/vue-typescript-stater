import { AxiosRequestConfig as OriginalAxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig extends OriginalAxiosRequestConfig {
    Authorization?: string;
    toasts?: boolean;
    urlParams?: Record<string, string>;
  }
}

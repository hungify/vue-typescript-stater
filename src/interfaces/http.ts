import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface StockRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

export interface StockRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: StockRequestInterceptors<T>;
  showLoading?: boolean;
}

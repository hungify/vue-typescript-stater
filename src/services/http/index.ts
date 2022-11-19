import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { StockRequestConfig, StockRequestInterceptors } from '~/interfaces/http';

class StockRequest {
  private instance: AxiosInstance;
  private interceptors?: StockRequestInterceptors;

  public constructor(config: StockRequestConfig) {
    this.instance = axios.create(config);

    this.interceptors = config.interceptors;

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    );

    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (err) => {
        return err;
      },
    );

    this.instance.interceptors.response.use(
      (res) => {
        const data = res;
        return data.data;
      },
      (err) => {
        if (err.response.status === 404) {
          console.log('404 not found');
        }
        return err;
      },
    );
  }

  public request<T = any>(config: StockRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          return err;
        });
    });
  }

  public get<T = any>(config: StockRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }

  public post<T = any>(config: StockRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }

  public delete<T = any>(config: StockRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }

  public patch<T = any>(config: StockRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}

export default StockRequest;

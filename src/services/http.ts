import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  Method,
} from 'axios';
import axios from 'axios';
import type { z } from 'zod';
import type { AllEndpoint } from '~/interfaces/endpoint';

export default abstract class HttpRequest {
  #instance: AxiosInstance;
  #accessToken: string;

  public constructor(accessToken?: string, configs?: AxiosRequestConfig) {
    this.#accessToken = accessToken || '';
    this.#instance = axios.create({
      baseURL: configs?.baseURL ?? import.meta.env.VITE_API_URL,
      ...configs,
    });
    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this.#instance.interceptors.request.use(this.handleRequest);
  };

  private handleRequest = (config: InternalAxiosRequestConfig) => {
    if (!config.url) {
      return config;
    }

    const currentUrl = new URL(config.url, config.baseURL);
    Object.entries(config.urlParams || {}).forEach(([k, v]) => {
      currentUrl.pathname = currentUrl.pathname.replace(`:${k}`, encodeURIComponent(v));
    });

    return {
      ...config,
      baseURL: currentUrl.origin,
      url: currentUrl.pathname,
      Authorization: `Bearer ${this.#accessToken}`,
    };
  };

  private initializeResponseInterceptor = () => {
    this.#instance.interceptors.response.use(this.handleResponse, this.handleError);
  };

  private handleResponse = (response: AxiosResponse) => {
    if (response.headers && response.headers.authorization) {
      const accessToken = response.headers.authorization.split(' ')[1];
      if (accessToken) {
        this.#accessToken = accessToken;
      }
    }
    return response;
  };

  private handleError = async (error: AxiosError) => {
    const originalRequest = error.config;
    if (originalRequest && error.response?.status === 401) {
      // refresh token here
      return this.#instance(originalRequest);
    }
  };

  public axiosRequest<TRequestSchema extends z.Schema, TResponseSchema extends z.Schema>({
    method,
    path,
    requestSchema,
    responseSchema,
    requestData = {},
    config,
  }: {
    path: AllEndpoint;
    method: Method;
    requestSchema: TRequestSchema;
    responseSchema: TResponseSchema;
    requestData?: z.infer<TRequestSchema>;
    config?: AxiosRequestConfig;
  }): Promise<z.infer<TResponseSchema>> {
    requestSchema.parse(requestData);
    const axiosRequestConfig: AxiosRequestConfig = {
      method,
      url: path,
      ...config,
    };
    if (method === 'GET' && path.split(':').length > 0) {
      axiosRequestConfig.urlParams = requestData;
    } else {
      Object.assign(axiosRequestConfig, {
        [method === 'GET' ? 'params' : 'data']: requestData,
      });
    }

    const response = this.#instance(axiosRequestConfig);
    if (import.meta.env.PROD) {
      const result = responseSchema.safeParse(response);
      if (!result.success) {
        // request report error to server
        console.error(result.error);
      }
      return response;
    }
    return responseSchema.parse(response);
  }

  public get instance() {
    return this.#instance;
  }
}
